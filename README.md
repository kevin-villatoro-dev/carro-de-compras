# Shopping Cart

Full-stack e-commerce shopping cart built with a modern monorepo architecture.

## Tech Stack

| Layer | Tech | Notes |
|-------|------|-------|
| Frontend | Vite 7 + React 19 + TypeScript 5.9 | Strict mode, `@/` path alias |
| State | Zustand (client) + TanStack Query (server) | Cart persisted to localStorage |
| Styling | Tailwind CSS v4 | CSS-first config via `@theme` |
| Backend API | Fastify 5 + TypeScript | Built-in schema validation |
| Admin Panel | Laravel 11 + Blade | CRUD for all entities |
| ORM | Drizzle (API) + Eloquent (Admin) | Shared PostgreSQL database |
| Database | PostgreSQL 16 | Relational, handles variants/pricing |
| Validation | Zod (API) + Laravel Rules (Admin) | Shared schemas where possible |
| Monorepo | Turborepo v2 + pnpm | Uses `tasks` key (not `pipeline`) |

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 20+ (for local dev)
- pnpm 9+

### With Docker (recommended)

```bash
# Clone and start all services
docker compose up -d

# View logs
docker compose logs -f
```

### Local Development

```bash
# Install dependencies
pnpm install

# Start all apps in dev mode
turbo dev
```

## Services

| Service | URL | Description |
|---------|-----|-------------|
| Web | http://localhost:5173 | Customer-facing storefront |
| API | http://localhost:3000 | REST API backend |
| Admin | http://localhost:8000 | Admin panel (Laravel) |
| PostgreSQL | localhost:5432 | Database |

### Admin Credentials

- **Email:** `admin@shopcart.local`
- **Password:** `password`

## Project Structure

```
/
├── apps/
│   ├── web/              # React frontend
│   │   └── src/
│   │       ├── app/        # Providers, routes, layouts, global styles
│   │       ├── features/   # cart/, products/, categories/, brands/
│   │       ├── entities/   # Domain models, business types
│   │       ├── shared/     # Reusable UI, hooks, utilities
│   │       ├── pages/      # Route-level components
│   │       └── lib/        # HTTP client, storage, logging
│   ├── api/              # Fastify backend
│   │   └── src/
│   │       ├── modules/    # auth/, products/, categories/, brands/, cart/, orders/
│   │       ├── plugins/    # db, jwt, cors, swagger
│   │       ├── services/   # Business logic
│   │       └── lib/        # Utilities
│   └── admin/            # Laravel admin panel
│       ├── app/
│       │   ├── Http/Controllers/  # CRUD controllers
│       │   └── Models/            # Eloquent models
│       ├── resources/views/       # Blade templates
│       ├── database/migrations/   # Database migrations
│       └── routes/                # Web routes
├── packages/
│   ├── shared-types/     # Shared TypeScript types
│   └── validation/       # Shared Zod schemas
├── docker-compose.yml
├── turbo.json
└── pnpm-workspace.yaml
```

## API Endpoints

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

## Database Schema

```
brands          categories        products          orders           order_items
├── id (UUID)   ├── id (UUID)     ├── id (UUID)     ├── id (UUID)    ├── id (UUID)
├── name        ├── name          ├── name          ├── user_id      ├── order_id
├── slug        ├── slug          ├── slug          ├── status       ├── product_id
├── description ├── description   ├── description   ├── total        ├── quantity
├── logo        ├── image         ├── price         ├── shipping_addr├── price
└── timestamps  ├── parent_id     ├── compare_price └── timestamps
                └── timestamps    ├── sku
                                  ├── stock
                                  ├── images[]
                                  ├── brand_id
                                  ├── category_id
                                  ├── is_active
                                  └── timestamps
```

## Design System

- **Typography:** Space Grotesk (display) + DM Sans (body)
- **Accent:** Ember `#e85d04` (CTAs, active states, focus rings)
- **Palette:** Ink `#111111`, Parchment `#fafaf8`, Paper `#ffffff`
- **Motion:** `prefers-reduced-motion` respected, purposeful transitions

## Architecture Decisions

- **API routes** use manual `zod.safeParse()` instead of `fastify-type-provider-zod` (peer dep conflicts with Fastify 5 + Zod 3)
- **API tsconfig** uses `Bundler` module resolution to support `@/` path aliases
- **Admin Dockerfile** creates Laravel via `composer create-project` then overlays custom code
- **Shared PostgreSQL** — Drizzle (API) and Eloquent (Admin) coexist on the same database
- **Cart store** uses derived selectors (`useCartTotal`, `useCartCount`) instead of getter methods to avoid re-renders
- **Admin auth** — Custom `EnsureUserIsAuthenticated` middleware with session-based login

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

# Database migrations (API)
pnpm --filter api drizzle-kit generate
pnpm --filter api drizzle-kit migrate

# Lint / typecheck
turbo lint
turbo typecheck
```

## Docker

```bash
# Start all services
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

## Environment Variables

### API (`apps/api`)

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `postgresql://postgres:postgres@db:5432/shopping_cart` | PostgreSQL connection |
| `PORT` | `3000` | Server port |
| `HOST` | `0.0.0.0` | Server host |
| `CORS_ORIGIN` | `http://localhost:5173` | Allowed CORS origin |

### Admin (`apps/admin`)

| Variable | Default | Description |
|----------|---------|-------------|
| `APP_ENV` | `local` | Environment |
| `APP_DEBUG` | `true` | Debug mode |
| `DB_HOST` | `db` | Database host |
| `DB_PORT` | `5432` | Database port |
| `DB_DATABASE` | `shopping_cart` | Database name |
| `DB_USERNAME` | `postgres` | Database user |
| `DB_PASSWORD` | `postgres` | Database password |
