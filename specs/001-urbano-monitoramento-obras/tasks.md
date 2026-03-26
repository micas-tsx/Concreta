---

description: "Task list for CONCRETA - Painel de Monitoramento Urbano de Obras Públicas"
---

# Tasks: CONCRETA - Painel de Monitoramento Urbano

**Input**: Design documents from `/specs/001-urbano-monitoramento-obras/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/
**Tech Stack**: Next.js 14, TypeScript, Leaflet, Shadcn/ui, Tailwind CSS, Zustand, Recharts

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Frontend project: `frontend/` at repository root
- Components: `frontend/src/components/`
- Types: `frontend/src/types/`
- Mock data: `frontend/src/data/mock/`
- Store: `frontend/src/store/`
- Hooks: `frontend/src/hooks/`
- Tests: `frontend/tests/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create Next.js 14 project with App Router in `frontend/`
- [x] T002 [P] Configure TypeScript 5.x with strict mode in `frontend/tsconfig.json`
- [x] T003 [P] Install and configure Tailwind CSS 3.4 in `frontend/tailwind.config.ts`
- [x] T004 [P] Install Shadcn/ui and configure base components in `frontend/src/components/ui/`
- [x] T005 Install Leaflet and react-leaflet with TypeScript types
- [x] T006 Install Zustand for state management
- [x] T007 Install Recharts for data visualization
- [x] T008 [P] Configure ESLint and Prettier in `frontend/`
- [x] T009 Configure dark mode theme with monospace typography in `frontend/src/app/globals.css`

**Checkpoint**: Project initialized with all dependencies installed

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T010 [P] Create TypeScript types for Obra entity in `frontend/src/types/obra.ts`
- [x] T011 [P] Create TypeScript types for Contrato, Aditivo in `frontend/src/types/contract.ts`
- [x] T012 [P] Create TypeScript types for Cronograma, Etapa in `frontend/src/types/timeline.ts`
- [x] T013 [P] Create TypeScript types for Execucao in `frontend/src/types/execution.ts`
- [x] T014 [P] Create TypeScript types for Localizacao, Foto in `frontend/src/types/location.ts`
- [x] T015 Create barrel exports in `frontend/src/types/index.ts`
- [x] T016 [P] Create mock obras data (50 samples) in `frontend/src/data/mock/obras.ts`
- [x] T017 [P] Create mock contracts data in `frontend/src/data/mock/contracts.ts`
- [x] T018 [P] Create mock executions history data in `frontend/src/data/mock/executions.ts`
- [x] T019 Create utility functions in `frontend/src/lib/utils.ts` (formatters, validators)
- [x] T020 Create Shadcn cn() helper in `frontend/src/lib/cn.ts`
- [x] T021 Create Zustand filter store in `frontend/src/store/filter-store.ts`
- [x] T022 [P] Create useObras hook in `frontend/src/hooks/use-obras.ts`
- [x] T023 [P] Create useFilters hook in `frontend/src/hooks/use-filters.ts`
- [x] T024 Create base layout with dark mode providers in `frontend/src/app/layout.tsx`
- [x] T025 [P] Create Button component variants in `frontend/src/components/ui/button.tsx`
- [x] T026 [P] Create Card components in `frontend/src/components/ui/card.tsx`
- [x] T027 [P] Create Badge component with status variants in `frontend/src/components/ui/badge.tsx`

**Checkpoint**: Foundation ready - types, mock data, and store complete. User story implementation can now begin.

---

## Phase 3: User Story 1 - Visualizar Obras no Mapa (Priority: P1) 🎯 MVP

**Goal**: Display all public works on an interactive map with clickable markers

**Independent Test**: Show map with markers; verify citizen can identify works by region and click markers for summary info

### Implementation for User Story 1

- [x] T028 [US1] Create ObrasMap component with Leaflet in `frontend/src/components/map/obras-map.tsx`
- [x] T029 [US1] Create ObraMarker component with custom styling in `frontend/src/components/map/obra-marker.tsx`
- [x] T030 [US1] Create marker popup component with obra summary in `frontend/src/components/map/marker-popup.tsx`
- [x] T031 [US1] Create map controls component (zoom, layers) in `frontend/src/components/map/map-controls.tsx`
- [x] T032 [US1] Create dashboard page layout in `frontend/src/app/page.tsx`
- [x] T033 [US1] Integrate map with mock data in `frontend/src/app/page.tsx`
- [x] T034 [US1] Add responsive styles for map container in `frontend/src/app/page.tsx`
- [x] T035 [US1] Add ARIA labels for map accessibility in `frontend/src/components/map/obras-map.tsx`
- [x] T036 [US1] Add skip to main content link for accessibility

**Checkpoint**: At this point, User Story 1 should be fully functional - map displays with clickable markers

---

## Phase 4: User Story 2 - Consultar Detalhes de Orçamento e Cronograma (Priority: P1)

**Goal**: Display complete details of each work including budget and schedule information

**Independent Test**: Select a work and verify all financial and temporal data displays correctly

### Implementation for User Story 2

- [x] T037 [US2] Create dynamic route for obra detail in `frontend/src/app/obras/[id]/page.tsx`
- [x] T038 [US2] Create ObraHeader component in `frontend/src/components/obra/obra-header.tsx`
- [x] T039 [US2] Create ObraContract component with financial details in `frontend/src/components/obra/obra-contract.tsx`
- [x] T040 [US2] Create status badge component with visual indicators in `frontend/src/components/obra/status-badge.tsx`
- [x] T041 [US2] Create ObraTimeline component with etapas in `frontend/src/components/obra/obra-timeline.tsx`
- [x] T042 [US2] Create etapa progress indicator in `frontend/src/components/obra/etapa-progress.tsx`
- [x] T043 [US2] Create contract value comparison component (original vs amended) in `frontend/src/components/obra/contract-comparison.tsx`
- [x] T044 [US2] Create funding source badge component in `frontend/src/components/obra/funding-source-badge.tsx`
- [x] T045 [US2] Add navigation from map popup to detail page
- [x] T046 [US2] Add back navigation to map from detail page
- [x] T047 [US2] Add loading states and error handling in detail page
- [x] T048 [US2] Add responsive layout for detail components

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Acompanhar Evolução da Execução (Priority: P2)

**Goal**: Track execution evolution over time with charts showing planned vs actual progress

**Independent Test**: Access work details and verify evolution chart displays planned vs real execution curve

### Implementation for User Story 3

- [x] T049 [US3] Create ExecutionChart component with Recharts in `frontend/src/components/charts/execution-chart.tsx`
- [x] T050 [US3] Create BudgetComparisonChart component in `frontend/src/components/charts/budget-comparison.tsx`
- [x] T051 [US3] Create evolution section in obra detail page
- [x] T052 [US3] Add stale data indicator component in `frontend/src/components/obra/stale-data-badge.tsx`
- [x] T053 [US3] Add delayed status visual indicators (red color, alert icon)
- [x] T054 [US3] Create photos gallery component in `frontend/src/components/obra/obra-photos.tsx`
- [x] T055 [US3] Add photo viewer with thumbnails
- [x] T056 [US3] Add chart responsiveness for mobile views

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently

---

## Phase 6: User Story 4 - Buscar e Filtrar Obras (Priority: P2)

**Goal**: Search and filter works by neighborhood, type, status, value range, or period

**Independent Test**: Apply filters and verify only matching works display on map and list

### Implementation for User Story 4

- [x] T057 [US4] Create FilterBar component in `frontend/src/components/dashboard/filter-bar.tsx`
- [x] T058 [US4] Create search input component in `frontend/src/components/dashboard/search-input.tsx`
- [x] T059 [US4] Create multi-select filter components (bairro, tipo, status) in `frontend/src/components/dashboard/`
- [x] T060 [US4] Create value range filter component in `frontend/src/components/dashboard/value-range-filter.tsx`
- [x] T061 [US4] Create clear filters button component
- [x] T062 [US4] Create active filters display component
- [x] T063 [US4] Integrate filters with Zustand store
- [x] T064 [US4] Add debounced search (150ms) in `frontend/src/hooks/use-filters.ts`
- [x] T065 [US4] Update map markers based on filter state
- [x] T066 [US4] Create ObrasList component for table view in `frontend/src/components/dashboard/obra-list.tsx`
- [x] T067 [US4] Add sort functionality to list component
- [x] T068 [US4] Add URL synchronization for filters in `frontend/src/store/filter-store.ts`
- [x] T069 [US4] Add ARIA live announcements for filter changes

**Checkpoint**: At this point, User Stories 1-4 should all work independently with filter functionality

---

## Phase 7: User Story 5 - Exportar Relatórios (Priority: P3)

**Goal**: Export work data in CSV and PDF formats for sharing and investigation

**Independent Test**: Export data and verify file contains complete and correct information

### Implementation for User Story 5

- [x] T070 [US5] Create CSV export utility in `frontend/src/lib/export-csv.ts`
- [x] T071 [US5] Create export button component in `frontend/src/components/dashboard/export-button.tsx`
- [x] T072 [US5] Create export modal with format options in `frontend/src/components/dashboard/export-modal.tsx`
- [x] T073 [US5] Implement CSV generation respecting current filters
- [x] T074 [US5] Create PDF export utility using browser print API in `frontend/src/lib/export-pdf.ts`
- [x] T075 [US5] Create PDF template component with work details in `frontend/src/components/export/pdf-template.tsx`
- [x] T076 [US5] Add export button to obra detail page
- [x] T077 [US5] Add download attribute for file naming
- [x] T078 [US5] Add loading state during export generation

**Checkpoint**: All user stories should now be independently functional

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T079 [P] Add Playwright E2E tests for critical user flows in `frontend/tests/e2e/`
- [ ] T080 [P] Add Vitest unit tests for utility functions in `frontend/tests/unit/`
- [ ] T081 [P] Add React Testing Library component tests in `frontend/tests/components/`
- [x] T082 Create StatsGrid component with summary metrics in `frontend/src/components/dashboard/stats-grid.tsx`
- [ ] T083 Add keyboard shortcuts for accessibility (search, filters)
- [ ] T084 Add focus trap for modals and dropdowns
- [ ] T085 Add reduced motion preference support
- [ ] T086 Optimize map marker clustering for 1000+ works
- [ ] T087 Add performance monitoring (Core Web Vitals)
- [ ] T088 Add Lighthouse CI configuration
- [x] T089 Create 404 page for obra not found
- [ ] T090 Update README with final project documentation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User stories can proceed in parallel (if staffed) or sequentially (P1 → P2 → P3)
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Builds on US1 navigation patterns
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Builds on US2 detail structure
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - Parallel to US3, shares filter state
- **User Story 5 (P3)**: Can start after Foundational (Phase 2) - Builds on all previous stories

### Within Each User Story

- Types before mock data
- Mock data before components
- Core components before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel
- Once Foundational phase completes:
  - US1 and US2 can start in parallel (both P1)
  - US3 and US4 can run in parallel (both P2)
  - US5 can start after US2 complete
- Different user stories can be worked on by different team members

---

## Parallel Execution Examples

### Scenario 1: Single Developer (Sequential)

```bash
# Phase 1-2: Setup and Foundational
T001 → T002 → T003 → ... → T027

# Phase 3: User Story 1 (MVP)
T028 → T029 → T030 → ... → T036

# STOP: Validate MVP - Map with markers working

# Phase 4: User Story 2
T037 → T038 → T039 → ... → T048

# Phase 5-6: Stories 3-4
T049 → ... → T069

# Phase 7: User Story 5
T070 → ... → T078
```

### Scenario 2: Team (Parallel)

```bash
# Developer A: User Story 1 (Map)
T028 → T029 → T030 → T031 → T032 → T033 → T034 → T035 → T036

# Developer B: User Story 2 (Details)
T037 → T038 → T039 → T040 → T041 → T042 → T043 → T044 → T045 → T046 → T047 → T048

# Developer C: User Story 4 (Filters)
T057 → T058 → T059 → T060 → T061 → T062 → T063 → T064 → T065 → T066 → T067 → T068 → T069
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test map independently - markers visible, clickable, responsive
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 + 4 → Test independently → Deploy/Demo
5. Add User Story 5 → Test independently → Deploy/Demo

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 4 (Filters)
3. After US2: Developer B → User Story 3 (Charts)
4. After US3: Developer B → User Story 5 (Export)

---

## Summary

| Metric | Count |
|--------|-------|
| Total Tasks | 90 |
| Phase 1 (Setup) | 9 |
| Phase 2 (Foundational) | 18 |
| Phase 3 (US1 - Map) | 9 |
| Phase 4 (US2 - Details) | 12 |
| Phase 5 (US3 - Evolution) | 8 |
| Phase 6 (US4 - Filters) | 13 |
| Phase 7 (US5 - Export) | 9 |
| Phase 8 (Polish) | 12 |
| Parallelizable [P] | 43 |

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Tests are NOT included by default - add if TDD approach requested
