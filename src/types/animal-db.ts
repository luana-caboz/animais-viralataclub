import { AnimalImage } from "@/types/animal-image";

export type AnimalDB = {
  id: string;
  nome: string;
  status: string;

  sexo: string;
  porte: string;
  cores: string;
  raca: string;

  data_nascimento: string;

  castrado: boolean;
  vacinado: boolean;
  vermifugado: boolean;

  condicoes_saude: string;

  personalidade: string;

  caes: string;
  gatos: string;
  criancas: string;

  energia: string;

  data_resgate: string;

  historia: string;

  foto_url: string;

  // internos

  localizacao_atual?: string | null;

  quem_adotou?: string | null;

  data_adocao?: string | null;

  como_foi_adotado?: string | null;

  contato?: string | null;

  formulario?: string | null;

  assinou_termo?: boolean | null;

  updated_from_sheet_at?: string | null;

  updated_manually_at?: string | null;

  origem?: "admin" | "sheet" | "api";

  visivel_no_site?: boolean;

  animal_images?: AnimalImage[];

  created_at?: string;

  updated_at?: string;
};