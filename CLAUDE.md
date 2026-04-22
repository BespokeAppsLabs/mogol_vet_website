# Mogol Dierekliniek & Wilddienste — Agent Reference

## Purpose
Premium marketing website for Mogol Dierekliniek & Wilddienste, a veterinary clinic and wildlife services provider in Lephalale, South Africa, led by Dr. D. Kriel (BVSc). The site showcases both domestic animal care and elite wildlife services including helicopter tracking, chemical immobilization, and relocation. An admin portal (demo) is included for vet management UX.

## Stack
- Framework: **Next.js 16** (App Router, React Compiler enabled, Turbopack)
- Package manager: **yarn** — use exclusively
- Database: None (static/marketing site)
- Key libs: `framer-motion` / `motion`, `gsap` + `@gsap/react`, `lenis` (smooth scroll), `radix-ui`, `tailwindcss v4`, `next-themes`, `sonner`
- Linting: **Biome** (`biome check` / `biome format`)
- UI base: shadcn/ui (components.json configured)

## Branch Flow
- `main` — production. Never push directly.
- `dev` — default agent branch. All PRs target `dev`.
- Feature branches: `feature/{slug}` from `dev`
- Agent job branches: `agent-job/{id}` auto-created by BespokeHQ

## Key Commands
```bash
yarn install
yarn dev          # Next.js dev server (Turbopack) → http://localhost:3000
yarn build        # Production build
yarn start        # Run production build
yarn lint         # Biome check (zero warnings policy)
yarn format       # Biome format --write
```

## Architecture
Next.js App Router project under `src/`. Public site pages and the admin portal demo are co-located under `src/app/`. Components are split into `sections/` (page-level), `custom/` (project-specific), `ui/` (shadcn primitives), `admin/`, and `providers/`. Static assets (images, SVGs) live in `public/images/`.

Key directories:
```
src/
├── app/                  # Next.js App Router — routes and layouts
│   ├── admin/            # Admin portal demo (dark "Tactical Charcoal" mode)
│   ├── theme/            # Theme configuration pages/routes
│   ├── globals.css       # Global Tailwind v4 styles
│   └── layout.tsx        # Root layout with providers
├── components/
│   ├── sections/         # Page sections (Hero, Services, Testimonials, etc.)
│   ├── custom/           # Project-specific composed components
│   ├── ui/               # shadcn/ui primitive components
│   ├── admin/            # Admin portal UI components
│   ├── providers/        # Context providers (theme, Lenis scroll, etc.)
│   ├── mode-toggle.tsx   # Dark/light mode toggle
│   └── theme-provider.tsx
├── lib/                  # Utility functions and shared logic
public/
├── images/               # High-quality photography assets
docs/                     # Client docs (product-brief, ux-ui-blueprint, content-plan)
```

## Design System

**Visual Identity — "Premium Bushveld":**
- Palette: Fine Art Black & White with warmth tones
  - Primary: `#000000` (Soot), `#FFFFFF` (Pure White)
  - Warmth: `#F5F5F0` (Bone), `#333333` (Charcoal), `#4A3728` (Earth/Dark Bark)
- Typography: Sleek sans-serif (Inter / Montserrat / Outfit)
- Admin portal: Dark mode ("Tactical Charcoal")

**Animation stack:**
- `framer-motion` / `motion` — hover micro-interactions
- `gsap` — scroll-triggered animations
- `lenis` — smooth scroll inertia
- Aceternity UI components for high-end effects (Hero Parallax, Tracing Beam, Infinite Moving Cards, Floating Dock, Bento Grid)

## Agent Rules
1. Always branch from `dev`.
2. Package manager: **yarn** only. Never use npm, pnpm, or bun for this project.
3. Run `yarn build` before opening a PR — zero build errors required.
4. Run `yarn lint` — Biome enforces zero warnings.
5. Conventional commits: `feat/fix/chore/docs/refactor`.
6. **Animal language rule**: Always refer to animals as **him/her**, never "it". This applies to all content, copy, comments, and placeholder text.
7. Design tone: "Guardians of the Bushveld" — authoritative, empathetic, never sterile. No cold clinical language.
8. Prefer `motion` (Framer Motion) for component-level animations; `gsap` for complex scroll sequences.
9. Keep the public site LCP-optimized — lazy-load Three.js/heavy animations where possible.
10. Admin portal is a **demo** — no real auth or data persistence required.

## Environment
No `.env.example` detected. No external API keys required for static site. If environment variables are added (e.g., email service, CMS), document them in `.env.example`.
