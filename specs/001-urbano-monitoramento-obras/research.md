# Research: CONCRETA Frontend Architecture

**Date**: 2026-03-26  
**Feature**: Painel de Monitoramento Urbano de Obras Públicas

## Technology Stack Decisions

### 1. Framework: Next.js 14 (App Router)

**Decision**: Next.js 14 with App Router

**Rationale**:
- Server Components by default enable efficient data fetching and reduce client bundle size
- Built-in image optimization, font optimization, and code splitting
- Route groups for organizing dashboard pages
- Middleware support for authentication (future)
- Static generation capability for improved performance

**Alternatives considered**:
- Vite + React SPA: Rejected - lacks SSR, SEO benefits, and built-in optimization
- Remix: Good alternative but smaller ecosystem; Next.js has better Shadcn/ui integration

---

### 2. Mapping: Leaflet + react-leaflet

**Decision**: Leaflet with react-leaflet wrapper

**Rationale**:
- Open source with no API key required for OpenStreetMap tiles
- Lightweight (~42KB gzipped)
- Extensive plugin ecosystem for clustering (leaflet.markercluster)
- TypeScript support via @types/leaflet
- Works well with SSR (dynamic import for Leaflet components)

**Alternatives considered**:
- Mapbox GL JS: Rejected - requires API key, usage limits, costs for high traffic
- Google Maps: Rejected - complex API, costs, poor dark mode support
- Deck.gl: Rejected - overkill for this use case, steep learning curve

---

### 3. UI Components: Shadcn/ui

**Decision**: Shadcn/ui component library

**Rationale**:
- Copy-paste components (not a package dependency) - full control over styling
- Built on Radix UI primitives for accessibility
- Consistent design language with dark mode support
- TypeScript-first with excellent DX
- Customizable via Tailwind CSS

**Alternatives considered**:
- Material UI (MUI): Rejected - JSS styling conflicts with Tailwind, larger bundle
- Chakra UI: Rejected - style overrides more complex
- Headless UI: Rejected - fewer pre-built components

---

### 4. Styling: Tailwind CSS 3.4 + Dark Mode

**Decision**: Tailwind CSS with dark mode via class strategy

**Rationale**:
- Utility-first allows precise design control
- PurgeCSS ensures minimal bundle size
- Dark mode class strategy allows user preference detection
- Built-in support for responsive design (mobile-first)
- Excellent integration with Shadcn/ui

**Aesthetic choices**:
- Dark Mode: Deep black backgrounds (#0a0a0a) with slate-900 panels
- Typography: JetBrains Mono for monospace data display (reinforces precision)
- Accent colors: Emerald for "on schedule", Amber for "warning", Rose for "delayed"

---

### 5. State Management: Zustand

**Decision**: Zustand for global filter state

**Rationale**:
- Minimal boilerplate compared to Redux
- Built-in TypeScript support
- Persist middleware for filter state persistence
- Excellent performance with selector-based subscriptions
- Works with SSR (needs client-side initialization)

**Alternatives considered**:
- Redux Toolkit: Rejected - excessive boilerplate for filter state only
- React Context: Rejected - re-render issues with frequent filter updates
- URL state: Considered but Zustand with URL sync is more ergonomic

---

### 6. Charts: Recharts

**Decision**: Recharts for data visualization

**Rationale**:
- React-native with excellent TypeScript support
- Composable components (AreaChart, LineChart, BarChart)
- Built-in tooltips and legends
- Responsive containers
- Lightweight (~25KB gzipped)

**Alternatives considered**:
- Chart.js: Rejected - requires canvas, less React-idiomatic
- Visx: Rejected - lower-level, more boilerplate
- Nivo: Rejected - larger bundle, opinionated styling

---

### 7. Data Types: TypeScript strict mode

**Decision**: TypeScript 5.x with strict mode enabled

**Rationale**:
- Full type safety reduces runtime errors
- Strict mode catches common mistakes
- Excellent IDE support for refactoring
- Required for Shadcn/ui component props

**Config**:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true
  }
}
```

---

### 8. Testing: Vitest + React Testing Library + Playwright

**Decision**: Vitest for unit/integration, Playwright for E2E

**Rationale**:
- Vitest: Vite-native, fast, compatible with Vite/Next.js HMR
- RTL: Tests behavior, not implementation details
- Playwright: Best cross-browser support, reliable selectors

**Test coverage targets**:
- Components: 80% coverage
- Critical paths (filters, map interactions): 100%

---

## Mock Data Strategy

### Data Structure

Mock data organized in TypeScript files under `src/data/mock/`:

- `obras.ts`: Array of ~50 sample obras with varied statuses
- `contracts.ts`: Associated contracts with amendments
- `executions.ts`: Historical execution records (monthly snapshots)
- `locations.ts`: Geographic data with some intentionally missing

### Realistic Data Guidelines

- Include edge cases: stalled works, works with amendments, works with missing data
- Geographic spread across fictional "Bairros" of a Brazilian city
- Budget values in BRL (R$) ranging from R$100k to R$50M
- Timeline: 2023-2026 for realistic data
- Photos: Use placeholder service (picsum.photos) or local placeholders

---

## Performance Optimization Strategy

### Code Splitting

- Leaflet map: Dynamic import with `next/dynamic` and `ssr: false`
- Charts: Lazy loaded below the fold
- Detail pages: Route-based splitting via Next.js

### Rendering Strategy

- Home page: Server Component for initial load, client hydration for interactivity
- Map: Client Component (dynamic import)
- Filters: Client Component with Zustand persistence

### Bundle Optimization

- Tree-shaking via ES modules
- Icon optimization with @iconify/react (tree-shakeable)
- Font optimization via next/font (JetBrains Mono)

---

## Accessibility (WCAG 2.1 AA)

### Implementation Checklist

- [ ] Color contrast ratios ≥ 4.5:1 for text
- [ ] Focus indicators visible on all interactive elements
- [ ] Skip to main content link
- [ ] ARIA labels on map markers and controls
- [ ] Keyboard navigation for all features
- [ ] Screen reader announcements for filter changes
- [ ] Reduced motion preference respected

### Tools

- axe-core for automated testing
- Lighthouse for CI accessibility audits
- VoiceOver/NVDA for manual testing

---

## File Organization Rationale

```
frontend/src/
├── app/           # App Router: pages, layouts, loading, error
├── components/
│   ├── ui/        # Shadcn primitives (button, card, badge)
│   ├── map/       # Map-specific components
│   ├── dashboard/ # Dashboard-specific components
│   ├── charts/    # Recharts wrappers
│   └── obra/      # Obra detail components
├── hooks/         # Custom React hooks
├── store/         # Zustand stores
├── types/         # TypeScript definitions
└── data/mock/    # Mock data files
```

**Rationale**:
- Feature-based organization (dashboard/, obra/, map/)
- Shared components in ui/ (Shadcn base)
- Clear separation between data (hooks/store) and presentation (components)

---

## Dependencies Summary

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    "leaflet": "1.9.x",
    "react-leaflet": "4.x",
    "@radix-ui/react-*": "various",
    "tailwindcss": "3.4.x",
    "zustand": "4.x",
    "recharts": "2.x",
    "date-fns": "3.x",
    "clsx": "2.x",
    "tailwind-merge": "2.x",
    "lucide-react": "latest",
    "class-variance-authority": "latest"
  },
  "devDependencies": {
    "typescript": "5.x",
    "@types/leaflet": "1.9.x",
    "vitest": "1.x",
    "@testing-library/react": "14.x",
    "@testing-library/jest-dom": "6.x",
    "playwright": "1.x",
    "eslint": "8.x",
    "prettier": "3.x",
    "tailwindcss-animate": "latest"
  }
}
```
