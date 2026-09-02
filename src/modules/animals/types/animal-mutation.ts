import type { AnimalImageInsert } from "./animal-image";

export type AnimalMutationPayload = {
  id: string;
  nome: string;
  status: string;
  sexo: string;
  porte: string;
  cores: string;
  raca: string;
  data_nascimento: string | null;
  castrado: boolean;
  vacinado: boolean;
  vermifugado: boolean;
  condicoes_saude: string;
  personalidade: string;
  caes: string;
  gatos: string;
  criancas: string;
  energia: string;
  data_resgate: string | null;
  historia: string;
};

export type ParsedAnimalForm = {
  animal: AnimalMutationPayload;
  images: AnimalImageInsert[];
};
