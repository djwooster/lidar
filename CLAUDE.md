@AGENTS.md

# Blueprint LiDAR — Project Guide

## What This Is
A conversion-focused, single-page marketing site for Blueprint LiDAR, a pre-drywall residential home scanning service. Built with Next.js (App Router), Tailwind CSS v4, Framer Motion, and Lucide icons.

## Architecture
- `src/app/page.tsx` — server component that composes all sections in order
- `src/components/sections/` — one file per page section, all client components
- `src/lib/motion.ts` — shared animation helpers (`fadeUp`, `fadeIn`)
- `src/app/globals.css` — Tailwind v4 config + CSS design tokens
- `src/app/layout.tsx` — root layout with Geist fonts and metadata

### Section render order
HeroSection → UrgencyStrip → HowItWorks → SeeThrough → VaultBento → SocialProof → FAQSection → BookingForm → Footer

FinalCTA is implemented but commented out in `page.tsx` — restore when needed.

## Design System
All values are defined as CSS custom properties in `globals.css :root` and referenced via `@theme inline`.

| Token | Value | Usage |
|---|---|---|
| Background | `#0a0a0b` | Page, section bg |
| Card | `#111113` | Bento cards |
| Primary | `#f97316` | CTAs, urgency accents |
| Accent | `#22d3ee` | SVG MEP callouts only |
| Muted text | `#6b6b6b` | Body copy |
| Border | `rgba(255,255,255,0.07)` | Card/section dividers |

Typography scale uses `clamp()` for fluid sizing — do not add fixed `sm:text-[Xpx]` overrides on headings.

## Animation Pattern
Every section uses `shouldReduceMotion = useReducedMotion() ?? false`. All scroll animations respect this flag — skip to final state when true.

**Use shared helpers from `@/lib/motion` — do not inline the pattern:**
```tsx
import { fadeUp, fadeIn } from "@/lib/motion";

// Spread directly onto a motion element
<motion.div {...fadeUp(shouldReduceMotion)} className="...">
<motion.div {...fadeUp(shouldReduceMotion, 0.15)} className="...">  // with delay
<motion.p   {...fadeIn(shouldReduceMotion)} className="...">         // opacity only
```

`fadeUp` — fade + slide up, includes `willChange: "transform"`, for containers/headings
`fadeIn` — opacity only, for labels/badges/logos

## Conventions
- **F-pattern layout**: all section content left-anchored with `max-w-7xl mx-auto px-8`
- **Section structure**: eyebrow label → h2 heading → body/grid
- **Eyebrow labels**: `font-mono text-[12px] text-white/35 tracking-[0.22em] uppercase`
- **Section headings**: `font-medium leading-[1.08] tracking-tight` + `style={{ fontSize: "clamp(22px, 5.5vw, 36px)" }}`
- **Section spacing**: `py-28 px-8`, divided by `border-t border-white/[0.05]`
- **Cards**: `bg-[#111113] rounded-2xl border border-white/[0.07] p-7`
- **Primary button**: `bg-[#f97316] hover:bg-[#ea6c0a] text-white font-semibold text-sm rounded-lg`

## iOS Safari Gotcha
Do **not** use `whileInView` on SVG `<g>` elements — iOS Safari's IntersectionObserver does not reliably track SVG children. Instead, attach a `useInView` ref to the parent container div and drive animations via `animate` prop. See `SeeThrough.tsx` for the pattern.

## Incomplete / Pending
- **SocialProof logos**: placeholder text spans — swap with `<Image>` tags once `/public/logos/` files exist
- **BookingForm submission**: `handleSubmit` has a mock 900ms delay — replace with real API endpoint or form service (Formspree, Resend, etc.)
- **Privacy/Terms pages**: linked in Footer but not yet implemented
- **Video format**: `hero-video.mov` is served as `video/mp4` (works in practice; add a `.webm` source for broader compatibility and smaller file size)
