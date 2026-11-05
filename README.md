# Cinewex

Marketing site for **Cinewex**, an AI creative studio producing cinematic ad films for brands.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-087ea4)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8)](https://tailwindcss.com/)
[![Biome](https://img.shields.io/badge/Biome-2-60a5fa)](https://biomejs.dev/)

## Overview

Cinewex replaces the traditional film-production pipeline with an AI-driven one: cinematic commercials, product ads, and social campaigns delivered in days instead of months. This repository is the studio's public site — a single, dark, cinema-styled landing page that explains the offer and routes every conversion point to a Tally project brief.

## Features

// TODO

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16.2 (App Router, single route) |
| UI | React 19.2 with the React Compiler enabled |
| Language | TypeScript 5, `strict` mode |
| Styling | Tailwind CSS 4, CSS-first (`@theme` / `@utility` in `globals.css`) |
| Primitives | Base UI (`@base-ui/react`) with shadcn-style components (`components.json`) |
| Carousel | Embla (`embla-carousel-react`) |
| Motion | Motion (`motion/react`) for text and card-stack animation, plus CSS keyframes |
| 3D | OGL with hand-written GLSL for the hero orb |
| Media | `next/image`, `next/font`, ImageKit (`@imagekit/next`) |
| Icons | Lucide, Phosphor, and local brand SVGs |
| Tooling | Biome 2.2, pnpm |

## Requirements

- **Node.js 20.9.0 or newer** (minimum declared by Next.js 16)
- **pnpm 9+** — the repo ships `pnpm-lock.yaml` (lockfile v9) and `pnpm-workspace.yaml`
- A WebGL-capable browser for the hero orb

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

## Configuration

No environment variables are required.

### Content and links

// TODO

### Conversion form

The Tally URL (`https://tally.so/r/2EgGgL`) is duplicated in three components: `Navigation.tsx`, `HeroSection.tsx`, and `CTASection.tsx`. Update all three when the form changes.

### Media

// TODO

### Metadata and fonts

Titles, descriptions, and Google Fonts (Space Grotesk, Inter, JetBrains Mono) are configured in `src/app/layout.tsx`. Design tokens, colors, radii, and custom utilities live in `src/app/globals.css`.

## Project structure
y