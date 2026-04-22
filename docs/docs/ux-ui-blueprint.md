# UX/UI Blueprint: Mogol Dierekliniek & Wilddienste

This document serves as the "Extensive UX Guide" for the Mogol website and portal, defining the premium aesthetics, component library, and motion effects.

## Visual Identity: "Premium Bushveld"
- **Palette**: Fine Art Black & White.
    - **Primary**: #000000 (Soot), #FFFFFF (Pure White).
    - **Warmth**: #F5F5F0 (Bone), #333333 (Charcoal), #4A3728 (Earth/Dark Bark).
- **Typography**: Sleek, authoritative, and elite sans-serif (e.g., Inter, Montserrat, or Outfit).
- **Tone**: "Guardians of the Bushveld"—Authoritative yet deeply empathetic.

---

## Component & Effects Library

### Foundation
- **Base Components**: [shadcn/ui](https://ui.shadcn.com/docs/installation/next) (Standardized layout, forms, and dialogs).
- **Advanced UI**: [Aceternity UI](https://ui.aceternity.com/docs/cli) (High-end motion and interaction).
- **Animation Engine**: [Motion (Framer Motion)](https://motion.dev/docs/react-hover-animation) for hover and micro-interactions.
- **Vector & SVG**: [Anime.js](https://animejs.com/documentation/svg) for complex SVG paths and scroll-triggered transforms.
- **3D & Visual Depth**: [Three.js](https://threejs.org/docs/) for immersive wildlife/savannah backgrounds.

### Specific Interaction Patterns

| Section | Component / Effect | Context & Link |
| :--- | :--- | :--- |
| **Main Navigation** | [Floating Dock](https://ui.aceternity.com/components/floating-dock) | Top-tier navigation for both public site and portal. |
| **Hero Section** | [Hero Parallax](https://ui.aceternity.com/components/hero-parallax) | Custom-built effect featuring Dr. Kriel's helicopter over the savannah. |
| **Site Progress** | [Tracing Beam](https://ui.aceternity.com/components/tracing-beam) | Narrative beam tracking user progress as they scroll through the story. |
| **Wildlife Gallery** | [Tracing Beam](https://ui.aceternity.com/components/tracing-beam) | Visual continuity for high-fidelity images. |
| **Testimonials** | [Infinite Moving Cards](https://ui.aceternity.com/components/infinite-moving-cards) | Smooth, loopable feedback from game farmers and pet owners. |
| **Story / History** | [Timeline](https://ui.aceternity.com/components/timeline) | Found on the **About Page** to track Mogol's evolution and helicopter milestones. |
| **Visual Accents** | [Parallax Scroll](https://ui.aceternity.com/components/parallax-scroll) | Used for mid-page transitions between domestic and wildlife services. |
| **Content Clusters** | [Bento Grid](https://ui.aceternity.com/components/bento-grid) | Used for "Service Capabilities" or "Recent Missions" in the analytics dashboard. |
| **Admin Portal** | [Sidebar](https://ui.aceternity.com/components/sidebar) | Sleek, collapsible navigation for the Vet Admin Demo. |
| **Loaders** | [Multi-Step Loader](https://ui.aceternity.com/components/loader) | Used for form submissions and logging into the portal. |

---

## Layout Strategy

### Public Website
1. **The Core Hook**: Hero Parallax utilizing "The Guardians" imagery. 
2. **The Narrative**: Tracing Beam guiding users through the dual-service model (Clinic vs. Wilddienste).
3. **The Proof**: Infinite Moving Cards for social proof + Parallax Scroll for "Tactical" visuals.
4. **The Call to Action**: High-contrast buttons with [Anime.js](https://animejs.com/documentation/animation) hover effects.

### Admin Dashboard (Demo)
- **Visual State**: "Tactical Charcoal" (Dark Mode).
- **Structure**: Aceternity Sidebar + Bento Grid layout for analytics widgets (Mission Heatmaps, Inquiry Trends).
- **Tone**: High-density information with "Mission Readiness" identifiers.

## Implementation Notes
- **Animal Respect**: All patient references must use **him/her**.
- **Performance**: Use [Anime.js Scroll Events](https://animejs.com/documentation/events/onscroll) for efficiency; ensure LCP (Largest Contentful Paint) is optimized despite Three.js overlays.
