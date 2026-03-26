export type FotoCategoria =
  | "canteiro"
  | "antes"
  | "depois"
  | "detalhe"
  | "aereo";

export interface Localização {
  obraId: string;
  endereco: string;
  bairro: string;
  cidade: string;
  cep: string | null;
  latitude: number | null;
  longitude: number | null;
  locationUnconfirmed: boolean;
}

export interface Foto {
  id: string;
  obraId: string;
  url: string;
  thumbnailUrl: string;
  legenda: string | null;
  dataCaptura: Date;
  categoria: FotoCategoria;
}

export const fotoCategoriaLabels: Record<FotoCategoria, string> = {
  canteiro: "Canteiro de Obras",
  antes: "Antes",
  depois: "Depois",
  detalhe: "Detalhe",
  aereo: "Aéreo",
};
