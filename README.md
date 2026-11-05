# Cinewex

AI-powered cinematic ad film production at unprecedented speed.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

## Project Description

Cinewex is a high-impact landing page for a creative agency specializing in AI-generated cinematic advertising. The platform showcases the agency's unique value proposition: replacing traditional film production workflows with neural AI pipelines that deliver cinema-grade content in days rather than months.

Built with Next.js 16, React 19, and TypeScript, the site features immersive WebGL animations, scroll-driven interactions, and a dark, cinematic aesthetic that reflects the brand's premium positioning.

## Features

- **Hero Section**: Full-viewport hero with WebGL-powered animated orb
- **Headline Section**: Bold typography showcasing brand positioning
- **Reality Slider**: Interactive before/after comparison between traditional and AI production
- **Portfolio Exhibition**: Hover-triggered background animations with portfolio items
- **Neural Workflow**: Scroll-driven 3-step workflow visualization with animated states
- **Testimonials**: Infinite marquee of client brands with testimonial quote
- **Call to Action**: High-impact conversion section
- **Navigation**: Fixed header with backdrop blur and smooth scrolling
- **Footer**: Social links and legal navigation

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+ (or npm/yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/cinewex.git
cd cinewex

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Linting

```bash
# Run Biome linter
pnpm lint

# Format code
pnpm format
```

## Key Patterns

### Component Architecture

All components use React's `memo()` for performance optimization with explicit `displayName` for debugging:

```tsx
export const MyComponent = memo<MyProps>(({ prop }) => {
  return <div>{prop}</div>;
});

MyComponent.displayName = "MyComponent";
```

### Custom Hooks

Stateful logic is extracted into custom hooks:

- `useScrollWorkflow`: Manages scroll-driven workflow step transitions
- `useSliderPosition`: Handles the reality slider drag interaction
- `usePortfolioBackgrounds`: Controls portfolio background visibility

### WebGL Orb

The `Orb` component uses OGL (lightweight WebGL library) with custom GLSL shaders for the hero background effect:

```tsx
// Orb renders a full-screen WebGL canvas with:
// - 3D simplex noise for organic movement
// - HSL color space manipulation
// - Mouse-reactive hover effects
```

### Lazy Loading

Below-fold sections are lazy-loaded to improve initial page load:

```tsx
const RealitySliderSection = lazy(() =>
  import("./sections/RealitySliderSection").then((m) => ({
    default: m.RealitySliderSection,
  }))
);
```

### CSS Utilities

Custom Tailwind utilities defined in `globals.css`:

- `glass-panel`: Frosted glass effect with backdrop blur
- `btn-primary-gradient`: Gradient button with glow
- `text-gradient`: Text fill with gradient
- `marquee`: Infinite scroll animation

## Environment Variables

No environment variables are required for this project. Image sources use external URLs configured in `next.config.ts`.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

WebGL features require WebGL 1.0 support.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Use TypeScript for all new code
- Run `pnpm lint` before committing
- Run `pnpm format` to format code
- Add proper type definitions
- Use `memo()` for all components
- Include `displayName` for memoized components

## License

[MIT License](LICENSE)

## Credits

[Cinewex Team](https://cinewex.com)
