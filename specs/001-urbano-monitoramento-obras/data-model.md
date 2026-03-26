# Data Model: CONCRETA

**Date**: 2026-03-26  
**Feature**: Painel de Monitoramento Urbano de Obras Públicas

## Entity Overview

```
Obra (Construction Project)
├── Contrato (Contract) [1..*]
│   ├── Aditivos (Amendments) [0..*]
│   └── Cronograma (Timeline) [1]
│       └── Etapas (Steps) [1..*]
├── Execuções (Executions) [1..*]
├── Localização (Location) [1]
└── Fotos (Photos) [0..*]
```

## Entities

### Obra (Construction Project)

Represents a public construction project.

```typescript
interface Obra {
  id: string;                        // Unique identifier (UUID)
  nome: string;                      // Project name
  descricao: string;                 // Detailed description
  tipo: ObraTipo;                    // Category
  status: ObraStatus;                // Current status
  createdAt: Date;                   // Creation date
  updatedAt: Date;                   // Last update date
  lastExecutionUpdate: Date | null;   // Last execution data update
  
  // Relations
  contratos: Contrato[];
  localização: Localização;
  fotos: Foto[];
}

type ObraTipo = 
  | 'educacao'      // Schools, nurseries
  | 'saude'         // Hospitals, clinics, UBS
  | 'mobilidade'    // Roads, bridges, bike paths
  | 'saneamento'    // Sewage, water treatment
  | 'lazer'         // Parks, sports courts
  | 'seguranca'     // Police stations, fire departments
  | 'infraestrutura' // General infrastructure
  | 'outro';        // Other categories

type ObraStatus = 
  | 'nao_iniciada'  // Contract signed, not started
  | 'em_andamento'   // In progress
  | 'paralisada'     // Temporarily stopped
  | 'concluida';     // Completed
```

**Validation Rules**:
- `id` must be a valid UUID v4
- `nome` must be 3-200 characters
- `status` transitions: `nao_iniciada` → `em_andamento` → `paralisada` | `concluida`

---

### Contrato (Contract)

Represents a contract associated with an obra.

```typescript
interface Contrato {
  id: string;                        // Unique identifier
  obraId: string;                    // Foreign key to Obra
  
  numero: string;                    // Contract number (e.g., "123/2023")
  processo: string;                   // Procurement process number
  
  // Financial
  valorLicitado: number;             // Bid value (BRL cents)
  valorContratado: number;           // Contracted value (BRL cents)
  
  // Temporal
  dataAssinatura: Date;              // Signature date
  prazoDias: number;                // Contract duration in days
  dataInicioPrevista: Date;          // Expected start date
  dataConclusaoPrevista: Date;       // Expected completion date
  
  // Metadata
  modalidade: ModalidadeLicitacao;   // Procurement type
  fonteRecursos: FonteRecurso[];     // Funding sources
  aditivos: Aditivo[];               // Amendments
  
  // Computed (denormalized for performance)
  valorExecutado: number;            // Total executed (calculated from executions)
  percentualExecutado: number;       // Execution percentage (0-100)
  emAditivo: boolean;               // Has active amendments
}

type ModalidadeLicitacao = 
  | 'pregao'
  | 'tomada_precos'
  | 'concorrencia'
  | 'dispensado'
  | 'inexigivel';

type FonteRecurso = 
  | 'tesouro_municipal'
  | 'tesouro_estadual'
  | 'tesouro_federal'
  | 'operacao_credito'
  | 'parceria_privada';
```

**Validation Rules**:
- `valorContratado` >= `valorLicitado` (can be higher with amendments)
- `dataAssinatura` <= `dataInicioPrevista`
- `prazoDias` > 0

---

### Aditivo (Amendment)

Represents contract amendments (price or time extensions).

```typescript
interface Aditivo {
  id: string;
  contratoId: string;
  
  tipo: AditivoTipo;
  valorAdicional: number;            // Additional value (BRL cents)
  novoPrazoDias: number;            // New deadline extension
  justificativa: string;             // Legal justification
  
  dataAprovacao: Date;
  numero: string;                   // Amendment number
}

type AditivoTipo = 
  | 'valor'         // Price increase
  | 'prazo'         // Time extension
  | 'valor_prazo';  // Both price and time
```

---

### Cronograma (Timeline)

Represents the planned schedule for a contract.

```typescript
interface Cronograma {
  id: string;
  contratoId: string;               // Foreign key to Contrato
  
  etapas: Etapa[];
}

interface Etapa {
  id: string;
  cronogramaId: string;
  
  nome: string;                     // Step name
  descricao: string;                // Step description
  ordem: number;                     // Execution order (1-based)
  
  // Planned
  dataInicioPrevista: Date;
  dataFimPrevista: Date;
  percentualPrevisto: number;        // Expected completion %
  
  // Actual
  dataInicioReal: Date | null;
  dataFimReal: Date | null;
  percentualExecutado: number;      // Actual completion %
  
  // Status
  status: EtapaStatus;
}

type EtapaStatus = 
  | 'nao_iniciada'
  | 'em_andamento'
  | 'concluida'
  | 'atrasada';
```

---

### Execução (Execution Record)

Represents a snapshot of work execution at a point in time.

```typescript
interface Execucao {
  id: string;
  obraId: string;
  contratoId: string;
  
  data: Date;                        // Record date
  percentualAcumulado: number;       // Total execution % (0-100)
  valorExecutado: number;            // Value executed (BRL cents)
  
  observacoes: string;               // Notes from inspector
  responsavel: string;                // Inspector name
  
  // Flag for stale data
  isStale: boolean;                  // Calculated: > 30 days since last update
}
```

---

### Localização (Location)

Represents the geographic location of a construction site.

```typescript
interface Localização {
  obraId: string;
  
  endereco: string;                  // Street address
  bairro: string;                    // Neighborhood/district
  cidade: string;                    // City (static for MVP: "Cidade Exemplo")
  cep: string | null;
  
  // Geographic
  latitude: number | null;           // GPS latitude (-90 to 90)
  longitude: number | null;          // GPS longitude (-180 to 180)
  
  // Flag for unconfirmed location
  locationUnconfirmed: boolean;       // True if GPS not verified
}
```

**Validation Rules**:
- If `latitude` is null, `locationUnconfirmed` must be true
- Coordinates must be within Brazil's bounds for mock data

---

### Foto (Photo)

Represents photos of the construction site.

```typescript
interface Foto {
  id: string;
  obraId: string;
  
  url: string;                       // Image URL
  thumbnailUrl: string;              // Thumbnail for list views
  legenda: string | null;             // Caption
  dataCaptura: Date;                 // When photo was taken
  categoria: FotoCategoria;           // Photo type
}

type FotoCategoria = 
  | 'canteiro'
  | 'antes'
  | 'depois'
  | 'detalhe'
  | 'aereo';
```

---

## Type Relationships Diagram

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    Obra     │───────│  Contrato   │───────│  Aditivo    │
│             │  1:N  │             │  1:N  │             │
└─────────────┘       └─────────────┘       └─────────────┘
       │                     │
       │ 1:1                 │ 1:1
       ▼                     ▼
┌─────────────┐       ┌─────────────┐
│ Localização │       │ Cronograma  │
│             │       │             │
└─────────────┘       └─────────────┘
                              │
                              │ 1:N
                              ▼
                       ┌─────────────┐
                       │   Etapa     │
                       │             │
                       └─────────────┘

┌─────────────┐       ┌─────────────┐
│    Obra     │───────│  Execucao    │
│             │  1:N  │             │
└─────────────┘       └─────────────┘

┌─────────────┐       ┌─────────────┐
│    Obra     │───────│    Foto      │
│             │  1:N  │             │
└─────────────┘       └─────────────┘
```

---

## State Machines

### Obra Status Transitions

```
     ┌──────────────┐
     │ nao_iniciada │
     └──────┬───────┘
            │ start work
            ▼
     ┌──────────────┐
     │ em_andamento │◄────────────┐
     └──────┬───────┘            │ resume
            │                    │
            ├────┬───────────────┤
            │    │               │
       finish │  pause          │
            │    │               │
            ▼    ▼               │
     ┌──────────────┐            │
     │  concluida   │            │
     └──────────────┘            │
                                 │
     ┌──────────────┐           │
     │  paralisada  │───────────┘
     └──────────────┘
```

### Etapa Status Transitions

```
     ┌──────────────┐
     │ nao_iniciada │
     └──────┬───────┘
            │ start
            ▼
     ┌──────────────┐     exceeds deadline     ┌──────────────┐
     │ em_andamento │─────────────────────────│   atrasada   │
     └──────┬───────┘                         └──────────────┘
            │
            │ complete
            ▼
     ┌──────────────┐
     │  concluida   │
     └──────────────┘
```

---

## Computed Values

These values are computed from related entities:

```typescript
interface ComputedObraMetrics {
  // From Contrato (primary contract)
  valorLicitado: number;              // Primary contract bid value
  valorContratado: number;            // Primary + all amendments
  valorExecutado: number;             // Sum of all executions
  valorRestante: number;             // valorContratado - valorExecutado
  
  // From executions
  percentualMedio: number;           // Average execution %
  diasEmAndamento: number;          // Days since start
  diasAtrasado: number;              // Days past expected completion
  
  // From Etapas
  etapasConcluidas: number;
  etapasEmAndamento: number;
  etapasAtrasadas: number;
  etapasPendentes: number;
  
  // Flags
  hasStaleData: boolean;              // Last update > 30 days
  hasContractAmendment: boolean;     // Has any amendments
  isOverBudget: boolean;             // valorExecutado > valorContratado
  isDelayed: boolean;               // End date passed, not completed
}
```

---

## Mock Data Requirements

### Data Volume

- **Obras**: 50 sample projects
- **Distribution by status**: 
  - 15% não iniciadas
  - 50% em andamento
  - 10% paralisadas
  - 25% concluídas
- **Distribution by type**: Varied across all types
- **Geographic spread**: All mock neighborhoods covered
- **Budget range**: R$100.000 to R$50.000.000

### Edge Cases to Include

1. **Obra sem localização GPS**: 3-5 works with `locationUnconfirmed: true`
2. **Obra com dados desatualizados**: 5-8 works with `lastExecutionUpdate` > 30 days ago
3. **Obra com aditivos**: 10-15 works with 1-3 amendments each
4. **Obra paralisada**: 5 works with status and reason
5. **Obra com etapas mistas**: Some completed, some delayed, some pending
6. **Valor contratado > licitado**: At least 10 works showing price increases

---

## Type Exports

```typescript
// src/types/index.ts
export type {
  Obra,
  ObraTipo,
  ObraStatus,
  Contrato,
  ModalidadeLicitacao,
  FonteRecurso,
  Aditivo,
  AditivoTipo,
  Cronograma,
  Etapa,
  EtapaStatus,
  Execucao,
  Localização,
  Foto,
  FotoCategoria,
  ComputedObraMetrics,
} from './obra';
```
