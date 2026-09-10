# Animated Delight

Website Animation Upgrade Prompt (for Lovable AI)

Project Context

GitHub repository (source of truth for structure/functionality): https://github.com/makilas157/creative-movement-tool.git

Animation/motion inspiration ONLY (do not copy content, branding, or design): https://www.thinkinfoexpertsolutions.in/

Hard Rules

Do NOT rebuild from scratch.

Do NOT remove existing functionality, pages, routes, components, forms, or API integrations.

Do NOT change the existing color palette or brand identity — accent colors only for glow/borders/hover states.

Do NOT copy content, text, logo, or design from the reference site — motion behavior only.

This is an ENHANCEMENT PASS, not a redesign.

Step 1 — Inspect Before Changing Anything

Before writing any code:

Read package.json and list existing dependencies.

Identify if Framer Motion, GSAP, Three.js, Lenis, or similar animation libraries are already installed.

List existing components, routes, and any existing animation/cursor systems.

Report back what you found before proceeding — do not install new animation libraries unless truly necessary, and explain why if you do.

Step 2 — Implement Animation System

Build reusable components/hooks (avoid duplicating animation logic): RevealOnScroll, MagneticButton, AnimatedCard, TiltCard, PageTransition, CustomCursor, ParallaxElement

Apply across the site:

Page load: navbar fades + slides down; hero elements (eyebrow → heading → description → CTAs → visual) stagger in at 80–120ms, opacity 0→1 + translateY(20px→0). Fast, not a long loading screen.

Scroll reveal: IntersectionObserver-based, opacity 0→1, translateY(30px→0), scale 0.98→1, 500–700ms ease-out, triggers once. Apply to all major sections and cards (cards stagger 50–100ms).

Hero: subtle animated background (gradient glow / light orbs / grid), mouse-based parallax (5–15px max), never reduces text readability.

Cursor: preserve/upgrade existing custom cursor if present — smooth trailing, glow, distinct hover states for buttons/cards/links. Auto-disable on touch devices.

Card hover: translateY(-6px), scale 1→1.015, border + shadow transition, soft glow, spring easing.

3D tilt: only on selected premium project/service cards, max 5–8° rotateX/rotateY, smooth reset on mouse leave.

Buttons: primary — shimmer sweep, hover glow, arrow moves 4–6px right; secondary — border glow + lift; click — scale-down feedback.

Navbar: load-in animation, scroll-triggered blur/shrink/shadow, animated underline on active link.

Mobile menu: fade+slide-down open, links stagger in (translateX(-10px)→0), smooth close.

Section headings: eyebrow → heading → description stagger; accent dots pulse (scale 1→1.25→1, ~1.5–2s loop) if they already exist.

Hero text reveal: word-by-word or line-by-line, subtle — only for main headings, not every paragraph.

Images/visuals: entrance animation + optional slow float (translateY 0→-8px→0, 4–6s loop).

Parallax: layered speeds (background slow, foreground faster), kept small.

Project cards: image zoom (scale 1→1.05), overlay, title/arrow shift on hover, overflow hidden.

Service cards: icon micro-animation, hover glow, lift, gradient background transition.

Scroll progress: thin top bar or subtle circular indicator.

Micro-interactions: consistent hover/click feedback across links, icons, arrows, form fields.

Contact form: smooth focus states, submit button normal→loading→success. Preserve existing form/backend logic — UI/animation only.

Footer: reveal animation, social icon hover (scale + lift + glow), link underline transitions.

Page transitions (if router exists): 300–500ms fade/slight movement between routes — must not break routing.

Performance & Accessibility (non-negotiable)

CSS transforms/opacity only where possible; GPU-friendly; IntersectionObserver over scroll listeners; no expensive JS loops.

Target 60fps.

Respect prefers-reduced-motion: reduce — disable parallax, cursor effects, shimmer, count-ups; simplify reveals; site must still look polished.

Desktop: full experience. Tablet: reduce heavy effects. Mobile: disable custom cursor, 3D tilt, heavy parallax.

Step 3 — Test & Report

Check every route, navbar, mobile menu, all CTAs, all cards, contact form, responsive breakpoints, console errors, animation performance, reduced-motion behavior, touch behavior.

Final Deliverable — report back with:

Files changed

Animations added (and where)

Libraries used (existing vs. new)

Any new dependencies added + justification

Any bugs fixed

Exact command to run the project

Confirmation that all existing functionality was preserved

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0f13e9a0-1e3d-48df-8ce6-a7563e5518d8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
