# Quickstart: CONCRETA Frontend

**Date**: 2026-03-26  
**Feature**: Painel de Monitoramento Urbano de Obras Públicas

## Prerequisites

- **Node.js**: 18.x or higher
- **pnpm**: 8.x (recommended) or npm 9.x
- **Git**: 2.x
- **IDE**: VS Code with recommended extensions

## Setup

### 1. Clone and Install

```bash
# Clone repository (if not already)
git clone <repo-url>
cd Concreta

# Install dependencies
pnpm install
```

### 2. Environment Configuration

Create `.env.local` in the project root:

```env
# Optional: Map tile provider
NEXT_PUBLIC_MAP_TILE_URL=https://tile.openstreetmap.org/{z}/{x}/{y}.png

# Optional: Analytics (deferred)
NEXT_PUBLIC_GA_ID=
```

### 3. Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Commands

```bash
# Development
pnpm dev              # Start dev server with HMR
pnpm build            # Production build
pnpm start            # Start production server

# Code Quality
pnpm lint             # ESLint
pnpm lint:fix         # ESLint auto-fix
pnpm format           # Prettier check
pnpm format:fix       # Prettier write

# Testing
pnpm test             # Run unit tests (Vitest)
pnpm test:watch       # Watch mode
pnpm test:coverage    # Coverage report
pnpm test:e2e         # Playwright E2E tests
pnpm test:e2e:ui     # Playwright UI mode

# Type Checking
pnpm typecheck         # TypeScript check
```

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # App Router pages
│   ├── components/             # React components
│   │   ├── ui/               # Shadcn/ui base
│   │   ├── map/              # Map components
│   │   ├── dashboard/        # Dashboard components
│   │   ├── charts/           # Chart components
│   │   └── obra/             # Obra detail components
│   ├── hooks/                 # Custom hooks
│   ├── store/                 # Zustand stores
│   ├── types/                 # TypeScript types
│   └── data/mock/             # Mock data
├── public/                    # Static assets
├── tests/                     # Test files
├── tailwind.config.ts        # Tailwind configuration
└── next.config.js            # Next.js configuration
```

## Development Workflow

### 1. Create Component

```bash
# After adding new component, run:
pnpm lint:fix
pnpm typecheck
pnpm test
```

### 2. Run Tests

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Coverage
pnpm test:coverage
```

### 3. Build for Production

```bash
pnpm build
pnpm start
```

## Key Technologies

| Technology | Purpose | Version |
|-----------|---------|---------|
| Next.js | React framework | 14.x |
| TypeScript | Type safety | 5.x |
| Tailwind CSS | Styling | 3.4.x |
| Shadcn/ui | UI components | latest |
| Leaflet | Maps | 1.9.x |
| Zustand | State management | 4.x |
| Recharts | Charts | 2.x |
| Vitest | Unit testing | 1.x |
| Playwright | E2E testing | 1.x |

## Troubleshooting

### Map Not Loading

Ensure Leaflet CSS is imported in your component:

```typescript
import 'leaflet/dist/leaflet.css';
```

### Dark Mode Issues

The app uses system preference by default. To force dark mode, add `class="dark"` to the `<html>` tag during development.

### Type Errors

Run `pnpm typecheck` to see all TypeScript errors. Common issues:

- Missing imports from `@/types`
- Incomplete mock data fields
- Undefined spread operator on arrays (use `?? []`)

## Mock Data

Mock data is located in `src/data/mock/`. To add new sample data:

1. Edit the corresponding `.ts` file
2. Follow the type definitions in `src/types/`
3. Run `pnpm test` to verify data integrity

## Performance Tips

- Use React Server Components by default
- Dynamic import for Leaflet: `next/dynamic` with `ssr: false`
- Lazy load charts below the fold
- Use `useMemo` for expensive computations
- Monitor bundle size: `pnpm analyze` (if configured)

## Next Steps

1. [ ] Implement map component with mock markers
2. [ ] Build filter bar with Zustand state
3. [ ] Create obra detail page
4. [ ] Add execution charts
5. [ ] Implement CSV/PDF export
6. [ ] Add E2E tests
