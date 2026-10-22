# Cinewex

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-087ea4?logo=react)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![GSAP 3](https://img.shields.io/badge/GSAP-3-88ce02?logo=greensock)](https://gsap.com/)
[![Biome 2](https://img.shields.io/badge/Biome-2-60a5fa?logo=biome)](https://biomejs.dev/)
[![Last commit](https://img.shields.io/github/last-commit/Digital-Covet/cinewex/master)](https://github.com/Digital-Covet/cinewex/commits/master)

Marketing site for **Cinewex**, an AI creative studio producing cinematic ad films for brands.

## Overview

Cinewex replaces the traditional film-production pipeline with an AI-driven one: cinematic commercials, product ads, and social campaigns delivered in days instead of months. This repository is the studio's public site — a single, dark, cinema-styled landing page that explains the offer and routes every conversion point to a Tally project brief.

The page is built as one continuous scroll "film": a letterboxed opening, a scroll-scrubbed premise, a draggable before/after comparison, a pinned services reel, a horizontal workflow track, a tools marquee, and a closing call to action.

## Features

- **Cinematic hero** — letterbox bars open as you scroll while the headline rises out of masked lines.
- **Scroll-driven premise** — the statement grades from shadow to full exposure word by word, with a drifting image strip.
- **Before/after comparison** — `RealitySlider` contrasts legacy production with the Cinewex pipeline. Supports pointer drag, arrow keys, `Home`/`End`, and plays a one-time demo sweep on first view.
- **Pinned services reel** — on desktop, scrolling steps through the four service offerings while the background still swaps behind them.
- **Horizontal workflow track** — the three process steps (Neural Brief → Visual Sculpting → Final Delivery) scroll sideways on desktop, with a progress bar.
- **Delivery reel** — the final workflow card streams a finished ad from ImageKit, playing only while in view.
- **Tools marquee** — an infinite logo row that speeds up with scroll velocity and settles back to its base pace.
- **Single conversion path** — nav, hero, and final CTA all use `CtaLink` and resolve to the same Tally form.
- **Reduced-motion support** — every GSAP scene is wrapped in `gsap.matchMedia`, Lenis is skipped when reduced motion is requested, and the marquee falls back to a static wrapped grid.
- **Share link** — the footer button copies the current URL to the clipboard.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16.2 (App Router, single route) |
| UI | React 19.2 with the React Compiler enabled (`next.config.ts`) |
| Language | TypeScript 5, `strict` mode |
| Styling | Tailwind CSS 4, CSS-first (`@theme` / `@utility` in `globals.css`) |
| Motion | GSAP 3 + ScrollTrigger, coordinated with Lenis smooth scrolling |
| Media | `next/image`, `next/font`, ImageKit (`@imagekit/next`) for video |
| Icons | Lucide plus local brand SVGs in `src/assets/brands` |
| Tooling | Biome 2.2, pnpm |

## Requirements

- **Node.js 20.9.0 or newer** — the minimum declared by Next.js 16.
- **pnpm 9+** — the repo ships a v9 `pnpm-lock.yaml` and a `pnpm-workspace.yaml`.
- A modern browser; the site relies on `svh` units, CSS `clip-path`, and the Intersection Observer API.

## Getting started

```bash
# Clone the repository
git clone https://github.com/Digital-Covet/cinewex.git
cd cinewex

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The site runs at [http://localhost:3000](http://localhost:3000).

Production build:

```bash
pnpm build
pnpm start
```

### Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Next.js dev server |
| `pnpm build` | Create a production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run `biome check` (lint + format checks) |
| `pnpm format` | Run `biome format --write` |

There is no test suite configured. Type errors surface during `pnpm build`.

## Configuration

No environment variables are required. The site is entirely static: the Tally form and ImageKit delivery endpoint are public URLs compiled into the bundle.

### Content and links

Nearly all copy and links live in [`src/constants/landing.ts`](src/constants/landing.ts): navigation, services, workflow steps, tool logos, legal links, and social accounts.

A few blocks are intentionally inline in their section components:

- Hero headline and subcopy — `src/components/landing/sections/Hero.tsx`
- Premise statement and three pillars — `src/components/landing/sections/Premise.tsx`
- Section headings and supporting paragraphs in the remaining sections

[`SECTIONS.md`](SECTIONS.md) describes the purpose of each section and is the design brief for page structure.

### Conversion form

`TALLY_URL` in `src/constants/landing.ts` is the single source for the project brief link. Every CTA renders through `CtaLink`, so changing the constant updates all three entry points at once.

### Media

Images are served locally from `public/`:

| Path | Used by |
| --- | --- |
| `public/headline/` | Premise image strip, final CTA background |
| `public/portfolio/` | Hero background and service previews |
| `public/reality-slider/` | Before/after comparison |
| `public/storyboards/` | Workflow step previews |
| `public/tools/` | Tool marquee logos |

The delivery video is **not** in `public/`. `WORKFLOW_STEPS[2].video` is `/final_ai_video.mp4`, resolved against `IMAGEKIT_URL_ENDPOINT` (`https://ik.imagekit.io/nyfnukger`) by the `ImageKitProvider` in `src/components/landing/index.tsx`. To swap the reel, upload a new file to that ImageKit account or change the endpoint and relative path.

`next.config.ts` allows remote images from any HTTPS hostname, so a remote image URL can be used without further config.

### Metadata, fonts, and tokens

- Page title, description, and Google Fonts (Bricolage Grotesque, Inter, JetBrains Mono) — `src/app/layout.tsx`
- Colors, font stacks, radii, easing, and custom utilities (`slate`, `container-cine`, `text-balance-pretty`) — `src/app/globals.css`

## Project structure

```text
.
├── public/                     Static images, logos, and brand marks
├── src/
│   ├── app/
│   │   ├── layout.tsx          Metadata, fonts, root shell
│   │   ├── page.tsx            Single route → <CinewexLanding />
│   │   └── globals.css         Tailwind theme, tokens, custom utilities
│   ├── assets/brands/          Social icon components
│   ├── components/landing/
│   │   ├── sections/           Hero, Premise, RealitySlider, Services,
│   │   │                       Workflow, Tools, FinalCta, Footer
│   │   ├── Navigation.tsx      Fixed nav that solidifies on scroll
│   │   ├── SmoothScroll.tsx    Lenis + GSAP ticker integration
│   │   ├── CtaLink.tsx         Tally conversion button
│   │   ├── ShareButton.tsx     Copy-link control
│   │   ├── Viewfinder.tsx      Decorative camera corner marks
│   │   └── index.tsx           Page composition and scroll order
│   ├── constants/landing.ts    All copy, links, and media paths
│   └── lib/
│       ├── gsap.ts             Plugin registration + shared media queries
│       └── utils.ts            `cn()` class merge helper
├── next.config.ts              React Compiler, remote image patterns
├── biome.json                  Lint and format rules
└── components.json             shadcn-style component aliases
```

Section order matters: `src/components/landing/index.tsx` mounts each scene top to bottom so ScrollTrigger measures pins correctly. Reordering sections may require adjusting trigger start/end values in the affected components.

### Dependency notes

`package.json` still declares `three`, `ogl`, `postprocessing`, `motion`, `embla-carousel-react`, `@base-ui/react`, and `@phosphor-icons/react`, but the current landing page does not import them. Confirm before relying on any of these libraries — GSAP, Lenis, Lucide, and ImageKit are the animation, icon, and media layers actually in use.

## Accessibility

- All scroll-driven GSAP motion is gated on `prefers-reduced-motion: no-preference` through `MOTION_QUERIES` in `src/lib/gsap.ts`; reduced-motion visitors get native scrolling and static layouts.
- The comparison slider exposes `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and `aria-valuetext`, and is operable by keyboard.
- Decorative imagery and letterbox bars are marked `aria-hidden`.
- Focus styles use a visible gold outline defined in `globals.css`.

## License

No `LICENSE` file is included in this repository. The site footer states that all rights are reserved by Cinewex.
