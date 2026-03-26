import type { Obra, ObraStatus, ObraTipo } from "@/types";
import { contratos } from "./contracts";
import { localizações, fotos } from "./locations";

const createObra = (
  id: string,
  nome: string,
  descricao: string,
  tipo: ObraTipo,
  status: ObraStatus,
  createdAt: Date,
  lastExecutionUpdate: Date | null
): Obra => {
  const obraContratos = contratos.filter((c) => c.obraId === id);
  const obraLocalização = localizações.find((l) => l.obraId === id) || {
    obraId: id,
    endereco: "Endereço não disponível",
    bairro: "Não definido",
    cidade: "São Sebastião",
    cep: null,
    latitude: -23.85,
    longitude: -46.60,
    locationUnconfirmed: true,
  };
  const obraFotos = fotos.filter((f) => f.obraId === id);

  return {
    id,
    nome,
    descricao,
    tipo,
    status,
    createdAt,
    updatedAt: lastExecutionUpdate || createdAt,
    lastExecutionUpdate,
    contratos: obraContratos,
    localização: obraLocalização,
    fotos: obraFotos,
  };
};

export const obras: Obra[] = [
  createObra(
    "obra-001",
    "Construção da Escola Municipal Professora Maria Silva",
    "Construção de escola de educação infantil com 12 salas de aula, biblioteca, quadra poliesportiva e cozinha industrial.",
    "educacao",
    "em_andamento",
    new Date("2023-12-15"),
    new Date("2024-10-15")
  ),
  createObra(
    "obra-002",
    "UBS Centro - Reforma e Ampliação",
    "Reforma e ampliação da Unidade Básica de Saúde do Centro com construção de sala de Raio-X e novo laboratório.",
    "saude",
    "em_andamento",
    new Date("2023-11-20"),
    new Date("2024-10-10")
  ),
  createObra(
    "obra-003",
    "Pavimentação Rua das Hortênsias",
    "Pavimentação asfáltica com drenagem pluvial e calçadas acessíveis na Rua das Hortênsias, Vila Nova.",
    "mobilidade",
    "concluida",
    new Date("2023-10-05"),
    new Date("2024-05-02")
  ),
  createObra(
    "obra-004",
    "Sistema de Esgotamento Sanitário - Bairro Alto",
    "Implantação de rede coletora de esgotos e Estação de Tratamento de Esgoto no Bairro Alto.",
    "saneamento",
    "em_andamento",
    new Date("2022-09-10"),
    new Date("2024-09-28")
  ),
  createObra(
    "obra-005",
    "Centro Esportivo Vila São José",
    "Construção de centro esportivo com campo de futebol society, piscina semi-olímpica e vestiários.",
    "lazer",
    "em_andamento",
    new Date("2023-08-25"),
    new Date("2024-10-05")
  ),
  createObra(
    "obra-006",
    "Ampliação do Parque Municipal",
    "Ampliação do Parque Municipal com novos jardins, playgrounds, pista de skate e quiosques.",
    "lazer",
    "em_andamento",
    new Date("2024-02-01"),
    new Date("2024-10-12")
  ),
  createObra(
    "obra-007",
    "Posto Policial Comunitário Rio Novo",
    "Construção de posto policial comunitário com sala de atendimento ao público e cela de guarda.",
    "seguranca",
    "em_andamento",
    new Date("2023-07-20"),
    new Date("2024-10-08")
  ),
  createObra(
    "obra-008",
    "UBS Parque Industrial - Nova Construção",
    "Construção de nova UBS no Parque Industrial com sala de vacina, consultórios médicos e odontológicos.",
    "saude",
    "nao_iniciada",
    new Date("2024-01-15"),
    null
  ),
  createObra(
    "obra-009",
    "Corredor de Ônibus Centro - Vila Nova",
    "Implantação de corredor exclusivo de ônibus com pista segregada e estações de embarque climatizadas.",
    "mobilidade",
    "em_andamento",
    new Date("2022-06-10"),
    new Date("2024-10-01")
  ),
  createObra(
    "obra-010",
    "Reforma da Creche Jardim das Flores",
    "Reforma geral da Creche Municipal com troca de cobertura, piso, esquadrias e sistema elétrico.",
    "educacao",
    "concluida",
    new Date("2023-05-10"),
    new Date("2023-11-01")
  ),
  createObra(
    "obra-011",
    "Urbanização Vila Nova - Fase 2",
    "Urbanização de área pública com implantação de praças, campos de terra batida e iluminação LED.",
    "infraestrutura",
    "em_andamento",
    new Date("2023-09-05"),
    new Date("2024-06-15")
  ),
  createObra(
    "obra-012",
    "Pontilhão Rio Novo",
    "Construção de pontilhão sobre o Rio Novo para conexão dos bairros Rio Novo e Parque Industrial.",
    "mobilidade",
    "paralisada",
    new Date("2022-07-15"),
    new Date("2024-02-20")
  ),
  createObra(
    "obra-013",
    "Hospital Municipal - Bloco B",
    "Construção do Bloco B do Hospital Municipal com 50 novos leitos, centro cirúrgico e UTI.",
    "saude",
    "em_andamento",
    new Date("2023-06-20"),
    new Date("2024-10-14")
  ),
  createObra(
    "obra-014",
    "Escola Técnica Municipal",
    "Construção de escola técnica municipal com laboratórios de informática, química e física.",
    "educacao",
    "em_andamento",
    new Date("2024-03-01"),
    new Date("2024-10-18")
  ),
  createObra(
    "obra-015",
    "Complexo Esportivo Cidade Jardim",
    "Construção de complexo esportivo com estádio municipal para 5.000 espectadores e academias ao ar livre.",
    "lazer",
    "em_andamento",
    new Date("2023-04-10"),
    new Date("2024-10-20")
  ),
  createObra(
    "obra-016",
    "Centro de Convenções Sul",
    "Construção de centro de convenções com auditórios, salas de exposição e estrutura para eventos.",
    "infraestrutura",
    "em_andamento",
    new Date("2024-01-10"),
    new Date("2024-10-15")
  ),
  createObra(
    "obra-017",
    "Estação Shopping",
    "Implantação de estação de metrô com integração a Shopping Center e terminais de ônibus.",
    "mobilidade",
    "em_andamento",
    new Date("2023-08-20"),
    new Date("2024-09-25")
  ),
  createObra(
    "obra-018",
    "Reforma Ginásio Asas Sul",
    "Reforma geral do ginásio esportivo com troca de cobertura, piso e instalações elétricas.",
    "lazer",
    "concluida",
    new Date("2023-11-05"),
    new Date("2024-06-10")
  ),
  createObra(
    "obra-019",
    "UBS Samambaia Sul",
    "Construção de nova UBS com sala de vaccine, consultórios médicos eodntológicos e recepção ampliada.",
    "saude",
    "em_andamento",
    new Date("2024-02-15"),
    new Date("2024-10-12")
  ),
  createObra(
    "obra-020",
    "Escola Técnica Taguatinga",
    "Construção de escola técnica com laboratórios de informática, química, física e biblioteca.",
    "educacao",
    "em_andamento",
    new Date("2024-03-20"),
    new Date("2024-10-18")
  ),
];

export function getObraById(id: string): Obra | undefined {
  return obras.find((o) => o.id === id);
}

export function getObrasByStatus(status: ObraStatus): Obra[] {
  return obras.filter((o) => o.status === status);
}

export function getObrasByBairro(bairro: string): Obra[] {
  return obras.filter((o) => o.localização.bairro === bairro);
}

export function getObrasByTipo(tipo: ObraTipo): Obra[] {
  return obras.filter((o) => o.tipo === tipo);
}

export const obraStats = {
  total: obras.length,
  emAndamento: obras.filter((o) => o.status === "em_andamento").length,
  concluidas: obras.filter((o) => o.status === "concluida").length,
  paralisadas: obras.filter((o) => o.status === "paralisada").length,
  naoIniciadas: obras.filter((o) => o.status === "nao_iniciada").length,
  valorTotalLicitado: contratos.reduce((acc, c) => acc + c.valorLicitado, 0),
  valorTotalExecutado: contratos.reduce((acc, c) => acc + c.valorExecutado, 0),
};
