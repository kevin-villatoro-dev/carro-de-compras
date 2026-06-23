# Design System: ShopCart

## 1. Visual Theme & Atmosphere

A **restrained e-commerce interface** with confident asymmetric layouts and fluid spring-physics motion. The atmosphere is clinical yet warm — like a well-curated boutique gallery meets a precision-engineered checkout flow.

- **Density:** "Daily App Balanced" (6) — Information-rich without feeling crowded
- **Variance:** "Offset Asymmetric" (7) — Intentional asymmetry that guides the eye, never chaotic
- **Motion:** "Fluid CSS" (5) — Purposeful micro-interactions that confirm actions, not distract

## 2. Color Palette & Roles

- **Canvas Warm** (#FAFAF8) — Primary background surface, warm parchment undertone
- **Pure Surface** (#FFFFFF) — Card and container fill, clean separation
- **Off-Black Ink** (#111111) — Primary text, deep charcoal depth (never pure black)
- **Muted Slate** (#6B7280) — Secondary text, descriptions, metadata
- **Whisper Border** (#E5E5E5) — Card borders, 1px structural lines
- **Ember Accent** (#E85D04) — Single accent for CTAs, active states, focus rings (saturation ~75%)
- **Ember Hover** (#D45303) — Accent darkened for hover/active states
- **Sage Success** (#059669) — Confirmation states, success messages
- **Crimson Alert** (#DC2626) — Error states, destructive actions (used sparingly)

**Constraints:**
- Maximum 1 accent color (Ember). Saturation below 80%
- No purple/blue neon aesthetic — strictly banned
- Never use pure black (#000000) — Off-Black (#111111) only
- One consistent palette across entire application

## 3. Typography Rules

- **Display/Headlines:** Space Grotesk — Track-tight (-0.02em), weight-driven hierarchy (600-700)
- **Body:** DM Sans — Relaxed leading (1.6), 65ch max-width, neutral secondary color
- **Mono/Code:** JetBrains Mono — For SKU codes, order IDs, timestamps
- **Banned:** Inter, Times New Roman, Georgia, generic system fonts

**Scale:**
- Hero headline: 3.5rem / 700 weight
- Section headers: 1.5-2rem / 600 weight
- Card titles: 0.9375rem / 600 weight
- Body text: 0.9375rem / 400 weight
- Labels: 0.8125rem / 600 weight
- Metadata: 0.75rem / 500 weight

**Dashboard Constraint:** Sans-Serif pairings exclusively (Space Grotesk + DM Sans)

## 4. Component Stylings

### Buttons
- **Primary:** Ember fill, white text, 10px border-radius
- **Tactile feedback:** -1px translate on active, box-shadow elevation on hover
- **No neon outer glow** — shadow tinted to background hue only
- **Ghost/Outline:** Transparent background, border for secondary actions

### Cards
- **Generously rounded corners:** 12-16px border-radius
- **Diffused shadow:** Multi-layer box-shadow with warm tint
- **Used only when elevation serves hierarchy** — high-density layouts use border-top dividers
- **Parchment background:** Slightly warmer than canvas for depth

### Inputs
- **Label above, error below** — standard gap spacing (0.5rem)
- **Focus ring:** Ember accent with 4px spread, 10% opacity
- **No floating labels** — clean, traditional form pattern
- **Background:** Parchment (#FAFAF8) inactive, white on focus

### Loading States
- **Skeletal shimmer** matching exact layout dimensions
- **No circular spinners** — ever
- **Gradient animation:** Left-to-right shimmer effect

### Empty States
- **Composed, illustrated compositions** — not just "No data" text
- **Emoji-free visual indicators** using geometric shapes or SVG illustrations
- **Clear call-to-action** explaining how to populate data

## 5. Layout Principles

- **Grid-first responsive architecture** — CSS Grid over Flexbox math
- **Asymmetric splits** for Hero sections (never centered when variance > 4)
- **Strict single-column collapse** below 768px — no exceptions
- **Max-width containment:** 1400px centered for content areas
- **No flexbox percentage math** — use Grid track sizing
- **Full-height sections:** `min-h-[100dvh]` — never `h-screen` (iOS Safari fix)
- **No overlapping elements** — every element occupies its own clear spatial zone

**Admin Panel Layout:**
- Fixed sidebar (240px) with dark background
- Main content area with sticky header
- Generous padding (2rem) for breathing room

**E-Commerce Layout:**
- Split-screen checkout (form + summary)
- Product grid: Responsive columns (2-4) with consistent gap
- Cart: Clear item list with sticky summary sidebar

## 6. Motion & Interaction

### Spring Physics
- **Default:** `stiffness: 100, damping: 20` — premium, weighty feel
- **No linear easing** — everything has organic deceleration
- **Active states:** `transform: translateY(-1px)` with shadow elevation

### Perpetual Micro-Interactions
- **Buttons:** Subtle scale on hover (1.02), tactile push on active
- **Cards:** Border-color transition on hover, not elevation change
- **Inputs:** Focus ring animation (0.2s ease)
- **Navigation:** Active indicator slide-in animation

### Staggered Orchestration
- **Never mount lists instantly** — use cascade delays for waterfall reveals
- **Page transitions:** Fade-in with upward slide (0.3s delay between elements)
- **Form elements:** Sequential appearance animation

### Performance
- **Animate exclusively via `transform` and `opacity`** — never `top`, `left`, `width`, `height`
- **Hardware-accelerated transforms only**
- **Reduced motion:** Respect `prefers-reduced-motion` — disable all animations

## 7. Anti-Patterns (Banned)

### Visual Anti-Patterns
- ❌ No emojis anywhere in UI
- ❌ No `Inter` font — ever
- ❌ No generic serif fonts (Times New Roman, Georgia, Garamond)
- ❌ No pure black (#000000) — use Off-Black (#111111)
- ❌ No neon/outer glow shadows
- ❌ No oversaturated accents (saturation must be < 80%)
- ❌ No excessive gradient text on large headers
- ❌ No custom mouse cursors
- ❌ No overlapping elements — clean spatial separation always

### Layout Anti-Patterns
- ❌ No 3-column equal card layouts — use asymmetric grids
- ❌ No centered Hero sections (for high-variance projects)
- ❌ No horizontal scroll on mobile — critical failure
- ❌ No `calc()` percentage hacks — use CSS Grid

### Content Anti-Patterns
- ❌ No generic placeholder names ("John Doe", "Acme", "Nexus")
- ❌ No fake round numbers ("99.99%", "50%")
- ❌ No fabricated data or statistics — use `[metric]` placeholders
- ❌ No `LABEL // YEAR` formatting ("SYSTEM // 2024")
- ❌ No AI copywriting clichés ("Elevate", "Seamless", "Unleash", "Next-Gen")
- ❌ No filler UI text ("Scroll to explore", "Swipe down", bouncing chevrons)

### Image Anti-Patterns
- ❌ No broken Unsplash links — use `picsum.photos` or SVG avatars
- ❌ No placeholder image services that require API keys

## 8. Responsive Strategy

### Mobile-First (< 768px)
- All multi-column layouts collapse to single column
- Typography scales via `clamp()` for fluid sizing
- Body text minimum: 1rem / 14px
- Touch targets: Minimum 44px tap target
- Navigation: Desktop horizontal nav collapses to clean mobile menu
- Spacing: Vertical section gaps reduce proportionally

### Tablet (768px - 1024px)
- 2-column layouts maintained where appropriate
- Sidebar collapsible or hidden
- Product grid: 2 columns

### Desktop (> 1024px)
- Full layout with fixed sidebar
- Product grid: 3-4 columns
- Generous whitespace and padding

## 9. Accessibility

- **Focus visible:** Ember accent ring on all interactive elements
- **Color contrast:** Minimum 4.5:1 for text, 3:1 for large text
- **Screen reader:** All images have descriptive alt text
- **Keyboard navigation:** Full tab order, no keyboard traps
- **Reduced motion:** All animations disabled when `prefers-reduced-motion: reduce`
- **Semantic HTML:** Proper heading hierarchy, landmarks, ARIA labels

---

*This DESIGN.md serves as the single source of truth for all ShopCart UI decisions. Every component, layout, and interaction must conform to these rules to maintain the premium, anti-generic aesthetic.*