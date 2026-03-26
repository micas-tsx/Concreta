# CONCRETA - Painel de Monitoramento Urbano de Obras Públicas

Sistema de transparência pública para acompanhamento de obras públicas municipais.

## Funcionalidades

- **Mapa Interativo**: Visualização de todas as obras em mapa com markers coloridos por status
- **Filtros Avançados**: Busca por nome, bairro, tipo de obra e status
- **Detalhes Completos**: Informações detalhadas de cada obra incluindo valores, cronogramas e aditivos
- **Exportação**: Exportação de dados em CSV e PDF
- **Dados Mockados**: 20 obras de exemplo (15 em São Sebastião, 5 em Brasília) com cenários realistas

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript 5.x
- **Estilização**: Tailwind CSS com Dark Mode
- **Componentes**: Shadcn/ui
- **Mapa**: Leaflet + react-leaflet
- **Estado**: Zustand
- **Gráficos**: Recharts

## Getting Started

```bash
# Entrar no diretório do frontend
cd frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) para visualizar o projeto.

## Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Verificação ESLint
npm run typecheck # Verificação TypeScript
npm run test     # Testes unitários (Vitest)
```

## Estrutura do Projeto

```
frontend/
├── src/
│   ├── app/           # App Router pages
│   ├── components/     # React components
│   │   ├── ui/       # Shadcn/ui base
│   │   ├── map/      # Map components
│   │   └── dashboard/ # Dashboard components
│   ├── hooks/         # Custom hooks
│   ├── store/         # Zustand stores
│   ├── types/         # TypeScript types
│   └── data/mock/     # Mock data
├── tests/             # Test files
└── package.json
```

## Cores do Status

| Status | Cor | Significado |
|--------|------|-------------|
| Em Andamento | Verde | Obra em execução normal |
| Concluída | Azul | Obra finalizada |
| Paralisada | Amarelo | Obra temporariamente suspensa |
| Não Iniciada | Cinza | Contrato assinado, obra não começou |

## Dados Mockados

O sistema inclui 20 obras de exemplo cobrindo:
- Escolas e creches (Educação)
- UBS e Hospital (Saúde)
- Pavimentação e corredor de ônibus (Mobilidade)
- Sistema de esgotamento sanitário (Saneamento)
- Centros esportivos e parques (Lazer)
- Centro de convenções e estações de metrô (Infraestrutura)

**Localização**:
- 15 obras em São Sebastião (SP)
- 5 obras em Brasília (DF) - Asa Sul, Asa Norte, Setor Sul, Samambaia, Taguatinga

Cada obra inclui:
- Dados financeiros (valor licitado, contratado, executado)
- Cronograma com etapas
- Histórico de execuções
- Fotos (mockadas com placeholder)

## Acessibilidade

- Skip link para conteúdo principal
- Navegação por teclado
- ARIA labels
- Alto contraste em Dark Mode
- Contraste de cores WCAG 2.1 AA
- Atalhos de teclado:
  - `Ctrl+K` ou `⌘K`: Focar na busca
  - `Escape`: Limpar busca ou fechar modal

## Preferências do Sistema

- Suporte a `prefers-reduced-motion` para usuários que preferem menos animações
- Dark mode automático baseado nas preferências do sistema

## Licença

MIT
