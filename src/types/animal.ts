import { AnimalImage } from "./animal-image";

export type Animal = {
  id: string;
  nome: string;
  status: string;
  sexo: string;
  porte: string;
  cores: string;
  raca: string;
  energia: string;
  personalidade: string;
  historia: string;
  fotos: AnimalImage[];
  idadeEstimada?: string;
  castrado: boolean;
  vacinado: boolean;
  vermifugado: boolean;
  condicoesSaude: string;
  caes: string;
  gatos: string;
  criancas: string;
  dataNascimento: string;
  dataResgate: string;
};

export type InternalAnimal = Animal & {
  localizacaoAtual?: string;
  quemAdotou?: string;
  dataAdocao?: string;
  comoFoiAdotado?: string;
  contato?: string;
  formulario?: string;
  assinouTermo?: boolean;
  updatedFromSheetAt?: string;
  updatedManuallyAt?: string;
  origem?: "admin" | "sheet" | "api";
  ativo?: boolean;
  visivelNoSite?: boolean;
};