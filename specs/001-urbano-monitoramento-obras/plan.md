# Implementation Plan: CONCRETA - Painel de Monitoramento Urbano

**Branch**: `001-urbano-monitoramento-obras` | **Date**: 2026-03-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-urbano-monitoramento-obras/spec.md` + Technical requirements from `/speckit.plan`

## Summary

Painel de monitoramento urbano para transparência de obras públicas. Frontend Next.js 14 com App Router, Leaflet para mapas interativos, Shadcn/ui para componentes, Tailwind CSS com Dark Mode monoespaçado. Dados mockados em arquivos .ts para MVP. Dashboard com métricas de valores e cronogramas, filtros por localização/categoria, gráficos de evolução.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Next.js 14 (App Router), React 18, Leaflet + react-leaflet, Shadcn/ui, Tailwind CSS 3.4, Zustand (state management), Recharts (gráficos), date-fns  
**Storage**: Mock data em arquivos `.ts` (frontend-only MVP)  
**Testing**: Vitest + React Testing Library + Playwright (E2E)  
**Target Platform**: Web browser (Chrome, Firefox, Safari, Edge - últimas 2 versões)  
**Project Type**: web-app / frontend-only (mock data)  
**Performance Goals**: FCP < 1.8s, TTI < 3.5s, filter latency < 200ms  
**Constraints**: WCAG 2.1 AA, Dark Mode, Mobile-first responsive (320px-1920px+)  
**Scale/Scope**: 5.000 obras máximo, 50+ componentes React

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Code Quality | ✅ PASS | ESLint + Prettier + TypeScript strict mode |
| II. Testing Standards | ✅ PASS | Vitest + RTL para unit, Playwright para E2E |
| III. UX Consistency | ✅ PASS | Shadcn/ui + Design System |
| IV. Performance | ✅ PASS | Server Components, code splitting, lazy loading |
| V. Mobile-First | ✅ PASS | Responsive design, 320px baseline |
| VI. Security | ⚠️ REVIEW | Frontend-only; XSS prevention via React, CSP headers via Next.js config |

## Project Structure

### Documentation (this feature)

```text
specs/001-urbano-monitoramento-obras/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (UI contracts only)
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
frontend/                          # Next.js 14 application
├── src/
│   ├── app/                       # App Router pages
│   │   ├── layout.tsx             # Root layout with providers
│   │   ├── page.tsx              # Dashboard home
│   │   ├── obras/
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Obra detail page
│   │   └── globals.css           # Tailwind + custom styles
│   ├── components/
│   │   ├── ui/                   # Shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   └── ...
│   │   ├── map/
│   │   │   ├── obras-map.tsx     # Main Leaflet map
│   │   │   ├── obra-marker.tsx   # Custom marker component
│   │   │   └── map-controls.tsx   # Zoom, filter toggles
│   │   ├── dashboard/
│   │   │   ├── stats-grid.tsx    # Metric cards
│   │   │   ├── filter-bar.tsx    # Search + filters
│   │   │   └── obra-list.tsx     # List/table view
│   │   ├── charts/
│   │   │   ├── execution-chart.tsx    # Evolução temporal
│   │   │   └── budget-comparison.tsx  # Licitado vs Executado
│   │   └── obra/
│   │       ├── obra-header.tsx
│   │       ├── obra-contract.tsx
│   │       ├── obra-timeline.tsx
│   │       └── obra-photos.tsx
│   ├── lib/
│   │   ├── utils.ts              # Utility functions
│   │   └── cn.ts                 # Shadcn cn() helper
│   ├── hooks/
│   │   ├── use-obras.ts          # Data fetching hook
│   │   ├── use-filters.ts        # Filter state management
│   │   └── use-map.ts            # Map interaction hook
│   ├── store/
│   │   └── filter-store.ts       # Zustand store for filters
│   ├── types/
│   │   ├── obra.ts               # Obra entity types
│   │   ├── contract.ts           # Contract types
│   │   └── index.ts              # Barrel exports
│   └── data/
│       └── mock/
│           ├── obras.ts           # Mock obras data
│           ├── contracts.ts       # Mock contracts
│           └── executions.ts      # Mock execution history
├── public/
│   └── icons/                    # Custom icons if needed
├── tests/
│   ├── unit/                     # Vitest unit tests
│   ├── components/                # Component tests (RTL)
│   └── e2e/                      # Playwright E2E tests
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── vitest.config.ts
```

**Structure Decision**: Single frontend project with mock data. No backend for MVP. Data layer uses Zustand for client state and TypeScript files for static mock data.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |

## Research Phase (Phase 0)

See `research.md` for detailed technology decisions.

## Design Phase (Phase 1)

See `data-model.md` for entity definitions and `quickstart.md` for development setup.
