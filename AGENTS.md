# AGENTS.md — Shopping Cart Project

## Skills

Use these skills automatically when the task matches. Do not wait for instructions. Do not ask the user if you should use them — just load them.

| Skill | When to use | Trigger examples |
|-------|-------------|------------------|
| `frontend-design` | Any UI/visual work in `apps/web/` | Redesigning components, creating new pages, styling, layout changes, adding animations |
| `context7-mcp` | Any question about libraries, frameworks, or APIs | "How do I use...", "What's the API for...", setting up new packages, debugging framework issues |
| `agent-browser` | Testing the web app, taking screenshots, automating browser tasks | "Probar el proyecto", "tomar screenshot", "verificar que funciona", "testear la UI" |

**Rules:**
1. If you're writing frontend code → load `frontend-design` first.
2. If you're using a library/framework you're unsure about → load `context7-mcp` to fetch current docs.
3. If you need to verify the app works visually → load `agent-browser` and test it.
4. Always load the skill BEFORE starting the work, not after.

## Stack

| Layer | Tech | Notes |
|-------|------|-------|
| Frontend | Vite 7 + React 19 + TypeScript 5.9 | Strict mode, `@/` path alias |
| State | Zustand (client) + TanStack Query (server) | Cart persisted to localStorage |
| Styling | Tailwind CSS v4 | CSS-first config via `@theme`, no postcss.config.js |
| Backend API | Fastify + TypeScript | Built-in schema validation |
| Admin Panel | Laravel 11 + Blade | CRUD for all entities |
| ORM | Drizzle (API) + Eloquent (Admin) | Shared PostgreSQL database |
| Database | PostgreSQL | Relational, handles variants/pricing |
| Validation | Zod (API) + Laravel Rules (Admin) | Shared schemas where possible |
| Monorepo | Turborepo v2 + pnpm | Uses `tasks` key (not `pipeline`) |

## Commands

```bash
# Install
pnpm install

# Dev (runs all apps)
turbo dev

# Build everything
turbo build

# Build one app
turbo build --filter=web
turbo build --filter=api

# Database migrations
pnpm --filter api drizzle-kit generate
pnpm --filter api drizzle-kit migrate

# Lint / typecheck (when configured)
turbo lint
turbo typecheck
```

## Docker

```bash
# Start all services (PostgreSQL + API + Web)
docker compose up -d

# View logs
docker compose logs -f

# Stop all services
docker compose down

# Stop and remove volumes (fresh start)
docker compose down -v

# Rebuild after changes
docker compose build --no-cache
docker compose up -d

# Access PostgreSQL
docker compose exec db psql -U postgres -d shopping_cart
```

**Ports:**
- Web: `http://localhost:5173`
- API: `http://localhost:3000`
- Admin: `http://localhost:8000`
- PostgreSQL: `localhost:5432`

## Architecture

```
/
├── apps/
│   ├── web/          # Frontend — feature-first structure
│   │   └── src/
│   │       ├── app/        # Providers, routes, layouts, global styles
│   │       ├── features/   # cart/, products/, categories/, brands/
│   │       ├── entities/   # Domain models, business types
│   │       ├── shared/     # Reusable UI, hooks, utilities (no business logic)
│   │       ├── pages/      # Route-level components
│   │       └── lib/        # HTTP client, storage, logging
│   ├── api/          # Backend — feature modules
│   │   └── src/
│   │       ├── modules/    # auth/, products/, categories/, brands/, cart/, orders/
│   │       ├── plugins/    # db, jwt, cors, swagger
│   │       ├── services/   # Business logic
│   │       └── lib/        # Utilities
│   └── admin/        # Laravel admin panel
│       ├── app/
│       │   ├── Http/Controllers/  # CRUD controllers
│       │   └── Models/            # Eloquent models
│       ├── resources/views/       # Blade templates
│       └── routes/                # Web routes
├── packages/
│   ├── shared-types/  # Shared TypeScript types (Product, Category, Cart, etc.)
│   └── validation/    # Shared Zod schemas
```

## Conventions

- **TypeScript strict mode** — no `any`, enable `noUncheckedIndexedAccess`
- **Path alias** — use `@/` for all imports (configured in `vite.config.ts` and `tsconfig.json`)
- **Feature isolation** — features must NOT import from other features; shared logic goes in `shared/`
- **Co-located tests** — `*.test.tsx` next to the code they test
- **Barrel exports** — each feature/entity exports its public API through `index.ts`
- **Code splitting** — `React.lazy` for route-level components
- **Functional components only** — no class components

## State Management Rules

- **Zustand** = client-only state (cart, UI preferences, form state)
- **TanStack Query** = server state (products, categories, brands)
- Never overlap responsibilities between the two
- Use **selectors** to subscribe to specific slices: `useCartStore(state => state.items)`
- Avoid selecting the entire store (causes unnecessary re-renders)
- Compute derived values (totals, counts) via `get()`, never store what you can calculate
- Middleware order: `devtools` > `persist` > `immer` (outermost to innermost)
- Use `partialize` in persist middleware to only save data, not UI state

## API Conventions

```
GET    /api/products          # List (filtering, pagination)
GET    /api/products/:id      # Detail
GET    /api/categories        # List
GET    /api/brands            # List
GET    /api/cart              # User's cart
POST   /api/cart              # Add item
PATCH  /api/cart/:id          # Update quantity
DELETE /api/cart/:id          # Remove item
DELETE /api/cart              # Clear cart
POST   /api/orders/checkout   # Cart → order (transactional)
```

- Validate all inputs with Zod
- Checkout must be transactional: validate stock → decrement atomically → clear cart

## Tailwind v4 Notes

- Config is CSS-first via `@theme` in your CSS file
- Use `@tailwindcss/vite` plugin in `vite.config.ts` (no `postcss.config.js`)
- Import with `@import "tailwindcss"` (not `@tailwind` directives)
