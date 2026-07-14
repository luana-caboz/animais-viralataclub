import { InternalAnimal } from "@/types/animal";
import { SheetAnimal } from "@/types/sheet-animal";

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
  if (!value) {
    return "";
  }

  const [month, year] = value.split("/");

  return `${year}-${month.padStart(
    2,
    "0"
  )}-01`;
}

export function mapSheetAnimal(
  animal: SheetAnimal
): InternalAnimal {
  return {
    id: animal.id,

    nome: animal.nome,

    status: normalizeStatus(
      animal.status
    ),

    sexo: animal.sexo,

    porte: animal.porte,

    cores: animal.cores,

    raca: animal.raca,

    dataNascimento:
      parseMonthYear(
        animal.dataNascimento
      ),

    dataResgate:
      parseMonthYear(
        animal.dataResgate
      ),

    castrado: animal.castrado,

    vacinado: animal.vacinado,

    vermifugado:
      animal.vermifugado,

    condicoesSaude:
      animal.condicoesSaude,

    personalidade:
      animal.personalidade,

    caes: animal.caes,

    gatos: animal.gatos,

    criancas:
      animal.criancas,

    energia: animal.energia,

    historia: animal.historia,

    fotos: [],

    localizacaoAtual:
      animal.localizacaoAtual,

    quemAdotou:
      animal.quemAdotou,

    dataAdocao:
      animal.dataAdocao,

    comoFoiAdotado:
      animal.comoFoiAdotado,

    contato: animal.contato,

    formulario:
      animal.formulario,

    assinouTermo:
      animal.assinouTermo,

    origem: "sheet",

    updatedFromSheetAt:
      new Date().toISOString(),

    visivelNoSite:
      normalizeStatus(
        animal.status
      ) === "DISPONIVEL",
  };
}