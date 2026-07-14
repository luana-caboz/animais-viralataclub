import { InternalAnimal } from "@/types/animal";
import { AnimalDB } from "@/types/animal-db";
import { AnimalImageDB } from "@/types/animal-image";

function calcularIdade(
  dataNascimento: string
) {
  const nascimento = new Date(dataNascimento);
  const hoje = new Date();

  let anos =
    hoje.getFullYear() -
    nascimento.getFullYear();

  let meses =
    hoje.getMonth() -
    nascimento.getMonth();

  if (meses < 0) {
    anos--;
    meses += 12;
  }

  if (anos <= 0) {
    return `${meses} mês${meses !== 1 ? "es" : ""}`;
  }

  return `${anos} ano${anos !== 1 ? "s" : ""}`;
}

export function mapAnimal(
  animal: AnimalDB,
): InternalAnimal {
  return {
    id: animal.id,
    nome: animal.nome,
    status: animal.status,

    sexo: animal.sexo,
    porte: animal.porte,
    cores: animal.cores,
    raca: animal.raca,

    dataNascimento:
      animal.data_nascimento,

    idadeEstimada: calcularIdade(
      animal.data_nascimento
    ),

    castrado: animal.castrado,
    vacinado: animal.vacinado,
    vermifugado: animal.vermifugado,

    condicoesSaude:
      animal.condicoes_saude,

    personalidade:
      animal.personalidade,

    caes: animal.caes,
    gatos: animal.gatos,
    criancas: animal.criancas,

    energia: animal.energia,

    dataResgate:
      animal.data_resgate,

    historia: animal.historia,

    fotos: animal.animal_images ?? [],

    // novos campos internos

    localizacaoAtual:
      animal.localizacao_atual ??
      undefined,

    quemAdotou:
      animal.quem_adotou ??
      undefined,

    dataAdocao:
      animal.data_adocao ??
      undefined,

    comoFoiAdotado:
      animal.como_foi_adotado ??
      undefined,

    contato:
      animal.contato ??
      undefined,

    formulario:
      animal.formulario ??
      undefined,

    assinouTermo:
      animal.assinou_termo ??
      undefined,

    updatedFromSheetAt:
      animal.updated_from_sheet_at ??
      undefined,

    updatedManuallyAt:
      animal.updated_manually_at ??
      undefined,

    origem:
      animal.origem ??
      "admin",

    visivelNoSite:
      animal.visivel_no_site ??
      true,
  };
}

function normalizeStatus(
  status: string
) {
  switch (status) {
    case "Disponível":
      return "DISPONIVEL";

    case "Adotado":
      return "ADOTADO";

    case "Em tratamento":
      return "EM_TRATAMENTO";

    default:
      return status;
  }
}

function parseMonthYear(
  value?: string
) {
  if (!value) return null;

  // já está em YYYY-MM-DD
  if (value.includes("-")) {
    return value;
  }

  const [month, year] =
    value.split("/");

  return `${year}-${month.padStart(
    2,
    "0"
  )}-01`;
}

export function mapAnimalToDB(
  animal: Partial<InternalAnimal>
): Partial<AnimalDB> {
  return {
    id: animal.id,
    nome: animal.nome,
    status: animal.status
      ? normalizeStatus(
          animal.status
        )
      : undefined,

    sexo: animal.sexo,
    porte: animal.porte,
    cores: animal.cores,
    raca: animal.raca,

    data_nascimento:
      parseMonthYear(
        animal.dataNascimento
      ) ?? undefined,

    castrado: animal.castrado,
    vacinado: animal.vacinado,
    vermifugado:
      animal.vermifugado,

    condicoes_saude:
      animal.condicoesSaude,

    personalidade:
      animal.personalidade,

    caes: animal.caes,
    gatos: animal.gatos,
    criancas: animal.criancas,

    energia: animal.energia,

    data_resgate:
      parseMonthYear(
        animal.dataResgate
      ) ?? undefined,

    historia:
      animal.historia,

    foto_url:
      animal.fotos?.[0]?.url ?? undefined,


    localizacao_atual:
      animal.localizacaoAtual,

    quem_adotou:
      animal.quemAdotou,

    data_adocao:
      animal.dataAdocao,

    como_foi_adotado:
      animal.comoFoiAdotado,

    contato:
      animal.contato,

    formulario:
      animal.formulario,

    assinou_termo:
      animal.assinouTermo,

    updated_from_sheet_at:
      animal.updatedFromSheetAt,

    updated_manually_at:
      animal.updatedManuallyAt,

    origem:
      animal.origem,

    visivel_no_site:
      animal.visivelNoSite,
  };
}