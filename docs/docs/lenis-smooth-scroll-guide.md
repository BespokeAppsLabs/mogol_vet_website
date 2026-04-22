# Lenis Smooth Scroll: Complete Implementation Guide

> **A comprehensive reference for creating premium scroll experiences using Lenis, GSAP ScrollTrigger, and Framer Motion.**

---

## Table of Contents

1. [Philosophy & Core Concepts](#philosophy--core-concepts)
2. [Installation](#installation)
3. [Basic Setup](#basic-setup)
4. [Key Configuration Options](#key-configuration-options)
5. [GSAP ScrollTrigger Integration](#gsap-scrolltrigger-integration)
6. [Framer Motion Integration](#framer-motion-integration)
7. [Scroll Effect Recipes](#scroll-effect-recipes)
8. [Performance & Accessibility](#performance--accessibility)
9. [Troubleshooting](#troubleshooting)

---

## Philosophy & Core Concepts

### Why Lenis Exists

Lenis wasn't built primarily for smooth scrolling—that was a "happy accident." The original mission was to **synchronize WebGL and DOM** during scroll. Native scrolling runs animations asynchronously across multiple threads, causing jank when trying to sync complex animations.

Lenis intercepts scroll input and **interpolates ("lerps")** the scroll position, providing a single, frame-synced value that both WebGL and DOM can read simultaneously.

### Key Terminology

| Term | Definition |
|------|------------|
| **Lerp** | Linear interpolation—smoothly transitions between values over time |
| **Scrub** | Links animation progress directly to scroll position |
| **Pin** | Fixes an element in the viewport while scroll-linked content moves |
| **Progress** | Normalized scroll position from `0` (top) to `1` (bottom) |

---

## Installation

### Package Manager

```bash
# npm
npm install lenis

# yarn
yarn add lenis

# pnpm
pnpm add lenis
```

### CDN (Vanilla JS)

```html
<script src="https://unpkg.com/lenis@latest/dist/lenis.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/lenis@latest/dist/lenis.css">
```

### With GSAP (for scroll-triggered animations)

```bash
npm install lenis gsap
```

---

## Basic Setup

### Vanilla JavaScript

```javascript
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

// Initialize with auto-RAF (simplest setup)
const lenis = new Lenis({
  autoRaf: true,
})

// Listen to scroll events
lenis.on('scroll', (e) => {
  console.log({
    scroll: e.scroll,        // Current scroll position
    velocity: e.velocity,    // Scroll speed
    direction: e.direction,  // 1 = down, -1 = up
    progress: e.progress,    // 0 to 1
  })
})
```

### Custom RAF Loop (For External Animation Libraries)

```javascript
import Lenis from 'lenis'

const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
```

### React Setup

```tsx
import { ReactLenis, useLenis } from 'lenis/react'

function App() {
  // Hook for scroll-linked effects
  useLenis((lenis) => {
    // Called every scroll frame
    console.log(lenis.progress)
  })

  return (
    <>
      <ReactLenis root />
      {/* Your app content */}
    </>
  )
}
```

### Next.js App Router Setup

```tsx
// app/providers.tsx
'use client'

import { ReactLenis } from 'lenis/react'
import { ReactNode } from 'react'

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1 }}>
      {children}
    </ReactLenis>
  )
}

// app/layout.tsx
import { SmoothScrollProvider } from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  )
}
```

---

## Key Configuration Options

### Core Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `lerp` | `number` | `0.1` | Smoothness intensity (0.05 = heavy/cinematic, 0.15 = snappy) |
| `duration` | `number` | `1.2` | Animation duration in seconds (ignored if `lerp` is set) |
| `smoothWheel` | `boolean` | `true` | Smooth mouse wheel input |
| `syncTouch` | `boolean` | `false` | Enable smooth scroll on touch devices |
| `orientation` | `string` | `'vertical'` | `'vertical'` or `'horizontal'` |
| `infinite` | `boolean` | `false` | Enable infinite scrolling |
| `autoRaf` | `boolean` | `false` | Auto-run requestAnimationFrame loop |

### Tuning the "Feel"

```javascript
// Heavy, cinematic scroll (like a luxury car)
new Lenis({ lerp: 0.05 })

// Balanced, premium feel
new Lenis({ lerp: 0.08 })

// Snappy, responsive scroll
new Lenis({ lerp: 0.15 })

// Duration-based (ignores lerp)
new Lenis({ 
  lerp: undefined,
  duration: 1.5,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
})
```

### Preventing Smooth Scroll on Specific Elements

```html
<!-- Via HTML attribute -->
<div data-lenis-prevent>Scrollable modal content</div>

<!-- Prevent only wheel events -->
<div data-lenis-prevent-wheel>...</div>

<!-- Prevent only touch events -->
<div data-lenis-prevent-touch>...</div>
```

```javascript
// Via JavaScript
new Lenis({
  prevent: (node) => node.classList.contains('no-smooth-scroll')
})
```

---

## GSAP ScrollTrigger Integration

### Setup (Critical for Scroll-Linked Animations)

```javascript
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis()

// 1. Sync Lenis scroll events with ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)

// 2. Tie Lenis RAF to GSAP ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000) // Convert seconds to milliseconds
})

// 3. Disable lag smoothing for perfect sync
gsap.ticker.lagSmoothing(0)
```

### React + GSAP Setup

```tsx
import { ReactLenis, type LenisRef } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    // Sync with GSAP ticker
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    // Sync scroll events
    lenisRef.current?.lenis?.on('scroll', ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(update)
    }
  }, [])

  return <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
}
```

---

## Framer Motion Integration

### Basic Setup

```tsx
import { ReactLenis, type LenisRef } from 'lenis/react'
import { frame, cancelFrame } from 'framer-motion'
import { useEffect, useRef } from 'react'

function App() {
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    function update({ timestamp }: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(timestamp)
    }

    frame.update(update, true)
    return () => cancelFrame(update)
  }, [])

  return <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
}
```

### Scroll-Linked Transforms

```tsx
import { useScroll, useTransform, motion } from 'framer-motion'

function ParallaxImage() {
  const { scrollYProgress } = useScroll()
  
  // Map scroll progress to Y translation
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.5])

  return (
    <motion.img 
      src="/image.jpg"
      style={{ y, opacity }}
      className="parallax-image"
    />
  )
}
```

### Element-Specific Scroll Progress

```tsx
import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

function RevealSection() {
  const ref = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'] // Track from entering to leaving viewport
  })

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <motion.section
      ref={ref}
      style={{ scale, opacity }}
    >
      Content reveals as you scroll
    </motion.section>
  )
}
```

---

## Scroll Effect Recipes

### 1. Horizontal Scroll Section (Pin + Pan)

Vertical scroll input translates to horizontal content movement.

```javascript
// HTML Structure:
// <section class="horizontal-wrapper">
//   <div class="horizontal-track">
//     <div class="card">01</div>
//     <div class="card">02</div>
//     <div class="card">03</div>
//   </div>
// </section>

const wrapper = document.querySelector('.horizontal-wrapper')
const track = document.querySelector('.horizontal-track')
const cards = gsap.utils.toArray('.card')

gsap.to(track, {
  x: () => -(track.scrollWidth - window.innerWidth),
  ease: 'none',
  scrollTrigger: {
    trigger: wrapper,
    pin: true,
    scrub: 1,
    end: () => `+=${track.scrollWidth}`,
    invalidateOnRefresh: true,
  },
})
```

**CSS:**
```css
.horizontal-wrapper {
  overflow: hidden;
}

.horizontal-track {
  display: flex;
  gap: 2rem;
  width: max-content;
}

.card {
  width: 80vw;
  height: 80vh;
  flex-shrink: 0;
}
```

---

### 2. Parallax Image Layers

```javascript
const layers = gsap.utils.toArray('.parallax-layer')

layers.forEach((layer, i) => {
  const depth = layer.dataset.depth || 0.5
  
  gsap.to(layer, {
    yPercent: -100 * depth,
    ease: 'none',
    scrollTrigger: {
      trigger: layer.parentElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
})
```

**HTML:**
```html
<div class="parallax-container">
  <img class="parallax-layer" data-depth="0.2" src="bg.jpg" />
  <img class="parallax-layer" data-depth="0.5" src="mid.jpg" />
  <img class="parallax-layer" data-depth="0.8" src="fg.jpg" />
</div>
```

---

### 3. Text Reveal on Scroll (Split Animation)

```javascript
import { SplitText } from 'gsap/SplitText' // GSAP Club plugin

gsap.registerPlugin(SplitText)

const headings = gsap.utils.toArray('.reveal-text')

headings.forEach((heading) => {
  const split = new SplitText(heading, { type: 'chars, words' })

  gsap.from(split.chars, {
    opacity: 0,
    y: 50,
    stagger: 0.02,
    scrollTrigger: {
      trigger: heading,
      start: 'top 80%',
      end: 'top 20%',
      scrub: 1,
    },
  })
})
```

**Free Alternative (without SplitText plugin):**
```javascript
function splitTextIntoSpans(element) {
  const text = element.textContent
  element.innerHTML = text
    .split('')
    .map((char) => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`)
    .join('')
  return element.querySelectorAll('.char')
}

const heading = document.querySelector('.reveal-text')
const chars = splitTextIntoSpans(heading)

gsap.from(chars, {
  opacity: 0,
  y: 30,
  stagger: 0.02,
  scrollTrigger: {
    trigger: heading,
    start: 'top 80%',
    toggleActions: 'play none none reverse',
  },
})
```

---

### 4. Section Pinning with Content Transition

```javascript
const sections = gsap.utils.toArray('.pinned-section')

sections.forEach((section) => {
  const content = section.querySelector('.content')

  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: '+=100%', // Pin for 100vh of scroll
    pin: true,
    pinSpacing: true,
  })

  gsap.fromTo(content, 
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        end: 'center center',
        scrub: true,
      },
    }
  )
})
```

---

### 5. Infinite Marquee

```javascript
const marquee = document.querySelector('.marquee-track')
const marqueeContent = marquee.innerHTML
marquee.innerHTML += marqueeContent // Duplicate for seamless loop

gsap.to(marquee, {
  x: '-50%',
  ease: 'none',
  duration: 20,
  repeat: -1,
})

// Optional: Speed up on scroll
lenis.on('scroll', ({ velocity }) => {
  gsap.to(marquee, {
    timeScale: 1 + Math.abs(velocity) * 0.5,
    overwrite: true,
  })
})
```

**CSS:**
```css
.marquee-wrapper {
  overflow: hidden;
}

.marquee-track {
  display: flex;
  width: max-content;
}
```

---

### 6. Scroll-Velocity-Based Effects

```javascript
lenis.on('scroll', ({ velocity }) => {
  // Skew content based on scroll velocity
  gsap.to('.skew-on-scroll', {
    skewY: velocity * 0.1,
    duration: 0.3,
    overwrite: true,
  })
})
```

---

### 7. Progress Bar

```javascript
const progressBar = document.querySelector('.progress-bar')

lenis.on('scroll', ({ progress }) => {
  progressBar.style.transform = `scaleX(${progress})`
})
```

**CSS:**
```css
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--accent-color);
  transform-origin: left;
  transform: scaleX(0);
  z-index: 9999;
}
```

---

### 8. Scroll-to-Anchor with Offset

```javascript
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault()
    const target = document.querySelector(anchor.getAttribute('href'))
    
    lenis.scrollTo(target, {
      offset: -100, // Account for fixed header
      duration: 1.2,
    })
  })
})
```

Or via Lenis config:
```javascript
new Lenis({
  anchors: {
    offset: -100,
    onComplete: () => console.log('Scrolled to anchor'),
  }
})
```

---

## Performance & Accessibility

### Performance Best Practices

1. **Use `will-change` sparingly**
   ```css
   .animated-element {
     will-change: transform;
   }
   ```

2. **Prefer transforms over layout properties**
   ```javascript
   // ✅ Good: GPU-accelerated
   gsap.to(el, { x: 100, y: 50, scale: 1.2 })
   
   // ❌ Avoid: Causes layout thrashing
   gsap.to(el, { left: '100px', width: '200px' })
   ```

3. **Batch ScrollTrigger refreshes**
   ```javascript
   ScrollTrigger.batch('.batch-item', {
     onEnter: (elements) => gsap.to(elements, { opacity: 1, stagger: 0.1 }),
   })
   ```

4. **Clean up on unmount (React)**
   ```tsx
   useEffect(() => {
     const ctx = gsap.context(() => {
       // Your animations
     }, containerRef)
     
     return () => ctx.revert()
   }, [])
   ```

### Accessibility Considerations

1. **Respect `prefers-reduced-motion`**
   ```javascript
   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
   
   new Lenis({
     lerp: prefersReducedMotion ? 1 : 0.1, // Instant scroll if reduced motion
     smoothWheel: !prefersReducedMotion,
   })
   ```

2. **Ensure keyboard navigation works**
   ```javascript
   // Lenis handles this by default, but verify Tab navigation works
   ```

3. **Maintain focus visibility during scroll animations**

---

## Troubleshooting

### Common Issues

| Problem | Solution |
|---------|----------|
| Scroll doesn't feel smooth | Ensure you've imported `lenis.css` and set `autoRaf: true` or a custom RAF loop |
| Animations out of sync | Disable GSAP lag smoothing: `gsap.ticker.lagSmoothing(0)` |
| Nested scroll not working | Add `data-lenis-prevent` to nested scrollable elements |
| Mobile scroll feels off | Enable `syncTouch: true` (may be unstable on iOS < 16) |
| Fixed elements lagging | Known issue on pre-M1 Safari; consider alternative positioning |
| Scroll stops over iframes | Iframes don't forward wheel events; this is a browser limitation |

### Debugging

```javascript
lenis.on('scroll', (e) => {
  console.log({
    scroll: e.scroll,
    animatedScroll: e.animatedScroll,
    targetScroll: e.targetScroll,
    velocity: e.velocity,
    isScrolling: e.isScrolling,
  })
})
```

---

## Resources

- [Lenis GitHub](https://github.com/darkroomengineering/lenis)
- [Lenis React Docs](https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md)
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Framer Motion useScroll](https://www.framer.com/motion/use-scroll/)
- [Codrops Tutorials](https://tympanus.net/codrops)
- [Lenis Demo Site](https://lenis.darkroom.engineering/)

---

*Last updated: January 2026*
