# UI Contracts: CONCRETA

**Date**: 2026-03-26  
**Feature**: Painel de Monitoramento Urbano de Obras Públicas

## Contract: Mapa de Obras

### Map Initialization

```typescript
interface MapContract {
  initialBounds: {
    minLat: number;  // -23.0 (São Paulo region mock)
    maxLat: number;  // -22.8
    minLng: number;  // -46.8
    maxLng: number;  // -46.5
  };
  
  defaultZoom: number;      // 12
  minZoom: number;          // 10
  maxZoom: number;          // 18
  
  tileUrl: string;          // OpenStreetMap or custom
}
```

### Marker Interaction

```typescript
interface MarkerClickContract {
  trigger: 'click' | 'enter' | 'focus';
  response: {
    showPopup: boolean;
    highlightMarker: boolean;
    updateUrl: boolean;     // /obras/:id
  };
}
```

---

## Contract: Filtros

### Filter State

```typescript
interface FilterStateContract {
  filters: {
    busca: string;                    // Text search
    bairro: string[];                // Multi-select
    tipo: ObraTipo[];                 // Multi-select
    status: ObraStatus[];             // Multi-select
    faixaValor: {
      min: number | null;
      max: number | null;
    };
    fonteRecursos: FonteRecurso[];    // Multi-select
  };
  
  sort: {
    field: 'nome' | 'valor' | 'percentual' | 'data';
    direction: 'asc' | 'desc';
  };
  
  pagination: {
    page: number;
    pageSize: number;   // 20, 50, 100
  };
}
```

### Filter Update

```typescript
interface FilterUpdateContract {
  trigger: 'userInput' | 'urlSync' | 'initialLoad';
  response: {
    updateMap: boolean;        // Recenter/filter markers
    updateList: boolean;       // Update table
    updateStats: boolean;      // Update summary cards
    debounceMs: number;        // 150ms for text input
  };
}
```

---

## Contract: Dashboard Stats

### Summary Metrics

```typescript
interface DashboardStatsContract {
  totalObras: number;
  obrasEmAndamento: number;
  obrasParalisadas: number;
  obrasConcluidas: number;
  
  valorTotalLicitado: number;      // BRL cents
  valorTotalExecutado: number;     // BRL cents
  percentualGeral: number;          // 0-100
  
  obrasComAditivos: number;
  obrasComAtraso: number;
  obrasComDadosDesatualizados: number;
}
```

---

## Contract: Detalhes da Obra

### Detail View

```typescript
interface ObraDetailContract {
  sections: {
    header: {
      nome: string;
      tipo: ObraTipo;
      status: ObraStatus;
      bairro: string;
    };
    
    contract: {
      numero: string;
      valorLicitado: number;
      valorContratado: number;
      valorExecutado: number;
      dataAssinatura: Date;
      prazoDias: number;
      fonteRecursos: FonteRecurso[];
    };
    
    timeline: {
      etapas: Etapa[];
      dataInicioReal: Date | null;
      dataConclusaoPrevista: Date;
    };
    
    evolution: {
      executions: Execucao[];
      chartData: ChartDataPoint[];
    };
    
    photos: {
      photos: Foto[];
      primaryPhoto: Foto | null;
    };
  };
}
```

---

## Contract: Exportação

### CSV Export

```typescript
interface CsvExportContract {
  format: 'csv';
  encoding: 'utf-8';
  delimiter: ',';
  
  fields: [
    'id',
    'nome',
    'tipo',
    'status',
    'bairro',
    'valorLicitado',
    'valorContratado',
    'valorExecutado',
    'percentualExecucao',
    'dataInicio',
    'dataConclusaoPrevista',
    'fonteRecursos',
    'temAditivo',
    'latitude',
    'longitude'
  ];
}

interface CsvExportTrigger {
  action: 'buttonClick' | 'urlParam';
  filters: FilterStateContract;  // Respect current filters
}
```

### PDF Export

```typescript
interface PdfExportContract {
  format: 'pdf';
  
  content: {
    header: {
      logo: string | null;
      title: string;
      generatedAt: Date;
    };
    
    summary: DashboardStatsContract;
    
    obraDetail: ObraDetailContract;
    
    footer: {
      pageNumbers: boolean;
      disclaimer: string;
    };
  };
}
```

---

## Contract: Responsividade

### Breakpoints

```typescript
interface BreakpointContract {
  mobile: '320px' <= width < '768px';
  tablet: '768px' <= width < '1024px';
  desktop: '1024px' <= width < '1280px';
  wide: width >= '1280px';
}
```

### Layout Changes

```typescript
interface LayoutContract {
  mobile: {
    sidebar: 'collapsed' | 'hidden';
    mapHeight: '60vh';
    listView: 'default';
  };
  
  tablet: {
    sidebar: 'collapsible';
    mapHeight: '50vh';
    listView: 'default';
  };
  
  desktop: {
    sidebar: 'visible';
    mapHeight: 'flex';
    listView: 'table';
  };
}
```

---

## Contract: Acessibilidade

### Keyboard Navigation

```typescript
interface KeyboardNavigationContract {
  tabOrder: [
    'skipLink',
    'searchInput',
    'filterBar',
    'mapControls',
    'obraList',
    'pagination'
  ];
  
  shortcuts: {
    '/': 'focusSearch';
    'f': 'openFilters';
    'Escape': 'clearFilters';
    'Enter': 'selectObra';
    'ArrowUp/Down': 'navigateList';
  };
}
```

### Screen Reader Announcements

```typescript
interface AriaAnnouncementContract {
  filterChange: 'Filtros atualizados. {count} obras encontradas';
  obraSelect: 'Obra selecionada: {nome}';
  mapZoom: 'Mapa ampliado/reduzido para nível {zoom}';
  dataStale: 'Aviso: dados desatualizados para esta obra';
}
```
