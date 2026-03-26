# Feature Specification: CONCRETA - Painel de Monitoramento Urbano de Obras Públicas

**Feature Branch**: `001-urbano-monitoramento-obras`  
**Created**: 2026-03-26  
**Status**: Draft  
**Input**: O CONCRETA deve ser um painel de monitoramento urbano que traduz orçamentos e cronogramas complexos em um mapa interativo e de fácil compreensão, abrangendo todo o ciclo de vida das construções da cidade, desde o valor licitado até o percentual real de execução nos canteiros de obras. A sua finalidade deve ser estabelecer um pilar de rigor e integridade na gestão pública, oferecendo ao cidadão informações sólidas e inabaláveis que sirvam como base para cobrar o cumprimento de prazos e o uso correto do dinheiro comum.

## Clarifications

### Session 2026-03-26

- Q: Qual modelo de autenticação? → A: Híbrido - Público para leitura, autenticado para funcionalidades avançadas (exportar, comentar)
- Q: Política de dados desatualizados? → A: Indicador visual para dados obsoletos - obras permanecem visíveis com aviso visual quando dados têm mais de 30 dias
- Q: Features fora do escopo MVP? → A: Notificações e feedback de cidadãos excluídos do MVP
- Q: Requisitos de acessibilidade? → A: Conformidade WCAG 2.1 Nível AA
- Q: Limite de escala para performance? → A: Suporte a 1.000-5.000 obras ativas sem degradação de performance

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visualizar Obras no Mapa (Priority: P1)

Como cidadão, eu quero visualizar todas as obras públicas da cidade em um mapa interativo para entender onde os recursos públicos estão sendo investidos geograficamente.

**Why this priority**: O mapa é a funcionalidade central do Concreta; sem ele, o cidadão não consegue ter a visão panorâmica que transforma dados abstratos em informação concreta sobre a cidade.

**Independent Test**: Pode ser testado exibindo o mapa com markers de obras e verificando que o cidadão consegue identificar obras por região simplesmente clicando nos markers do mapa.

**Acceptance Scenarios**:

1. **Given** O cidadão acessa a página inicial, **When** O mapa carrega, **Then** Todos os canteiros de obras ativos são exibidos como markers no mapa com sua localização correta
2. **Given** O cidadão visualiza o mapa, **When** Clica em um marker de obra, **Then** Um popup exibe o nome da obra, endereço e percentual de execução atual
3. **Given** O cidadão está no mapa, **When** Usa zoom ou pan, **Then** O mapa responde fluidamente e mantém a interatividade dos markers

---

### User Story 2 - Consultar Detalhes de Orçamento e Cronograma (Priority: P1)

Como cidadão, eu quero consultar os detalhes de cada obra incluindo valor licitado, valor contratado, cronograma previsto e execução real para avaliar se os recursos estão sendo bem utilizados.

**Why this priority**: Esta é a função de transparência central do Concreta - permitir que o cidadão audite os gastos públicos comparando o planejado com o executado.

**Independent Test**: Pode ser testado selecionando uma obra e verificando que todos os dados financeiros e temporais são exibidos corretamente e permitem comparação.

**Acceptance Scenarios**:

1. **Given** O cidadão está visualizando uma obra no mapa, **When** Clica para ver detalhes completos, **Then** Exibe valor licitado, valor contratado, fonte de recursos, data de início prevista, data de conclusão prevista, e percentual de execução atual
2. **Given** O cidadão está na tela de detalhes, **When** Visualiza o cronograma, **Then** Exibe etapas planejadas com datas previstas versus datas reais de conclusão de cada etapa
3. **Given** O cidadão está comparando dados, **When** Houve aditivo de prazo ou valor, **Then** O sistema destaca claramente os valores originais versus os valores com aditivo

---

### User Story 3 - Acompanhar Evolução da Execução (Priority: P2)

Como cidadão, eu quero acompanhar a evolução da execução de cada obra ao longo do tempo para identificar obras paralisadas, atrasadas ou com problemas.

**Why this priority**: A evolução temporal permite identificar problemas antes que se tornem irreversíveis e dá base para cobrança ativa junto aos órgãos responsáveis.

**Independent Test**: Pode ser testado verificando que gráficos de evolução estão disponíveis e mostram a curva de execução planejada versus real.

**Acceptance Scenarios**:

1. **Given** O cidadão está nos detalhes de uma obra, **When** Acessa a seção de evolução, **Then** Exibe gráfico mostrando execução planejada versus execução real ao longo do tempo
2. **Given** O cidadão acompanha uma obra, **When** A execução está abaixo do esperado, **Then** Sistema indica visualmente o atraso (por exemplo, com cor vermelha ou indicador de alerta)
3. **Given** O cidadão identifica uma obra parada, **When** Verifica status, **Then** Exibe informação sobre paralisação e motivo, se disponível

---

### User Story 4 - Buscar e Filtrar Obras (Priority: P2)

Como cidadão, eu quero buscar e filtrar obras por bairro, tipo, status, faixa de valor ou período para encontrar informações específicas rapidamente.

**Why this priority**: Com dezenas ou centenas de obras, filtros são essenciais para que o cidadão encontre relevância pessoal - por exemplo, obras no bairro onde mora.

**Independent Test**: Pode ser testado aplicando filtros e verificando que apenas obras correspondentes são exibidas no mapa e na lista.

**Acceptance Scenarios**:

1. **Given** O cidadão está no mapa principal, **When** Aplica filtro por bairro, **Then** Apenas obras daquele bairro são exibidas
2. **Given** O cidadão quer filtrar por status, **When** Seleciona "Em andamento" ou "Paralisada", **Then** Lista é atualizada para mostrar apenas obras com aquele status
3. **Given** O cidadão busca por texto, **When** Digita o nome de uma obra, **Then** Resultados são exibidos em tempo real

---

### User Story 5 - Exportar Relatórios (Priority: P3)

Como cidadão ou veículo de imprensa, eu quero exportar dados e relatórios das obras para compartilhar informações e fazer investigações mais aprofundadas.

**Why this priority**: Transparência ativa - permitir que terceiros multipliquem o alcance das informações do Concreta através de reportagens e análises próprias.

**Independent Test**: Pode ser testado exportando dados e verificando que o arquivo contém informações completas e corretas.

**Acceptance Scenarios**:

1. **Given** O cidadão está visualizando uma obra, **When** Clica em exportar, **Then** Sistema oferece formatos como PDF (relatório visual) e CSV (dados abertos)
2. **Given** O cidadão exporta PDF, **When** Abre o documento, **Then** Contém informações completas da obra incluindo gráfico de execução e fotos, se disponíveis

---

### Edge Cases

- O que acontece quando uma obra não possui dados de execução atualizados (por exemplo, mais de 30 dias sem atualização)? → Exibir indicador visual de dado desatualizado (badge de aviso)
- Como o sistema trata obras com múltiplos contratos ou aditivos? → Exibir todos os contratos/aditivos com destaque para o contrato principal e somatório de aditivos
- O que acontece quando o valor contratado é maior que o valor licitado? → Destacar diferença com indicador visual e explicitar que houve aditivo de valor
- Como são exibidas obras que ainda não iniciaram mas já têm contrato assinado? → Status "Não Iniciada" com prazo de início previsto
- O que acontece quando a localização GPS do canteiro de obras está incorreta ou indisponível? → Exibir com endereço textual; marcar como "localização não confirmada"
- Como o sistema trata obras metropolitanas que atravessam múltiplos bairros? → Permitir múltiplos bairros por obra; exibir no bairro sede ou centroid

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Sistema DEVE exibir todas as obras públicas em mapa interativo com markers posicionados corretamente por coordenadas geográficas
- **FR-002**: Sistema DEVE mostrar informações resumidas de cada obra ao clicar no marker (nome, endereço, percentual de execução)
- **FR-003**: Sistema DEVE exibir tela de detalhes completa com: valor licitado, valor contratado, valor executado, data de início, prazo contratual, evolução da execução
- **FR-004**: Sistema DEVE permitir filtros por: bairro/região, tipo de obra, status (em andamento, paralisada, concluída, não iniciada), faixa de valor
- **FR-005**: Sistema DEVE permitir busca por texto no nome da obra ou descrição
- **FR-006**: Sistema DEVE exibir cronograma das etapas planejadas com indicadores visuais de cumprimento (no prazo, atrasada, concluída)
- **FR-007**: Sistema DEVE exibir gráfico de evolução comparando execução planejada versus execução real
- **FR-008**: Sistema DEVE indicar visualmente obras com problemas (atraso, paralisação, execução negativa) E obras com dados desatualizados (mais de 30 dias sem atualização)
- **FR-009**: Sistema DEVE exportar dados em formatos abertos (CSV) para reutilização por terceiros
- **FR-010**: Sistema DEVE exportar relatórios visuais (PDF) para compartilhamento
- **FR-011**: Sistema DEVE exibir fotos do canteiro de obras quando disponíveis
- **FR-012**: Sistema DEVE ser responsivo para visualização em dispositivos móveis (320px a 1920px+)
- **FR-013**: Sistema DEVE manter dados históricos de execução para permitir análise temporal
- **FR-014**: Sistema DEVE exibir informações sobre fonte de recursos (federal, estadual, municipal) para cada obra
- **FR-015**: Sistema DEVE permitir acesso público anônimo para leitura de dados; funcionalidades avançadas (exportar, comentar) requerem autenticação
- **FR-016**: Sistema DEVE conformar com WCAG 2.1 Nível AA (navegação por teclado, compatível com leitores de tela, contraste de cores adequado)
- **FR-017**: Sistema DEVE suportar até 5.000 obras ativas simultâneas sem degradação perceptível de performance

### Out of Scope (MVP)

- Notificações e alertas por email para cidadãos
- Sistema de comentários ou feedback dos cidadãos nas obras
- Dashboard agregado com estatísticas da cidade (total gasto, atraso médio, etc.)
- Integração com sistemas de pagamento ou transferência de recursos
- Aplicativo móvel nativo (versão web responsiva abrangida)

### Key Entities

- **Obra (Construction Project)**: Representa uma obra pública; atributos incluem identificador único, nome, descrição, tipo (escola, hospital, estrada, etc.), status atual, coordenadas geográficas, data de cadastro, bairro(s) atendido(s)
- **Contrato (Contract)**: Vinculado a uma obra; atributos incluem número do contrato, valor licitado, valor contratado, data de assinatura, prazo em dias, modalidade de licitação, fonte de recursos
- **Cronograma (Timeline)**: Vinculado a um contrato; atributos incluem etapas com descrições, datas previstas, datas reais, percentuais de execução por etapa
- **Execução (Execution)**: Registros de acompanhamento; atributos incluem data do registro, percentual acumulado, valor executado, observações, fotos, data de última atualização
- **Localização (Location)**: Endereço e coordenadas GPS do canteiro de obras; flag para localização não confirmada
- **Aditivo (Amendment)**: Alterações contratuais; atributos incluem tipo (valor, prazo), valor adicional, novo prazo, justificativa
- **Usuário (User)**: Usuário autenticado; atributos incluem email, nome, perfil (visualizador, exportador)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Cidadão consegue localizar qualquer obra pública da cidade no mapa em menos de 3 cliques a partir da página inicial
- **SC-002**: 100% das obras com contrato ativo estão visíveis no mapa com localização correta
- **SC-003**: Cidadão consegue visualizar dados completos de qualquer obra incluindo evolução histórica em menos de 30 segundos
- **SC-004**: Tempo de carregamento inicial do mapa com até 500 obras visíveis é inferior a 5 segundos
- **SC-005**: Sistema permite filtrar lista de obras em tempo real enquanto digita (latência inferior a 200ms)
- **SC-006**: Dados exportados em CSV contêm todos os campos obrigatórios e podem ser abertos em planilhas padrão
- **SC-007**: Interface é utilizável em telas de smartphone (320px de largura) até desktop (1920px+)
- **SC-008**: Cidadão consegue identificar visualmente se uma obra está no prazo, atrasada ou paralisada em até 2 segundos de observação
- **SC-009**: Sistema mantém performance adequada (SC-004) com até 5.000 obras carregadas
- **SC-010**: Usuários com deficiência conseguem completar tarefas principais usando apenas teclado e leitor de tela

## Assumptions

- Dados das obras serão fornecidos através de integração com sistemas existentes da prefeitura ou importação de planilhas
- Atualizações de execução serão feitas periodicamente por servidores públicos responsáveis
- Cobertura inicial abrange obras financiadas com recursos municipais; extensão para obras estaduais e federais pode ser feita posteriormente
- Mapa utiliza coordenadas geográficas (latitude/longitude) disponíveis nos cadastros das obras
- Formato de importação inicial é planilha eletrônica (Excel/CSV) com estrutura padronizada
- Sistema será hospedado em infraestrutura da prefeitura com garantias de disponibilidade
- Não há integração com sistemas de pagamento ou transferência de recursos - apenas visualização e acompanhamento
- Autenticação usa provedor de identidade institucional (Login Único gov.br ou equivalente)
- Dados obsoletos (>30 dias sem atualização) permanecem visíveis com indicador visual
