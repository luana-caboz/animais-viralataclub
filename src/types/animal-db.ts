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

  adotado_em?: string | null;

  created_at?: string;
  updated_at?: string;
};