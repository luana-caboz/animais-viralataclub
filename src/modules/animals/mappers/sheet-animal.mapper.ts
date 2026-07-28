import { AnimalSync } from "../types/animal-sync";
import { SheetAnimal } from "../types/sheet-animal";

import {
    parseBoolean,
    parseDate,
    parseStatus,
} from "../../sync/services/helpers";

export function mapSheetAnimal(
  animal: SheetAnimal
): AnimalSync {
  return {
    id: animal.id,

    nome: animal.nome,

    status: parseStatus(
      animal.status
    ),

    sexo: animal.sexo,

    porte: animal.porte,

    cores: animal.cores,

    raca: animal.raca,

    dataNascimento: parseDate(
      animal.dataNascimento
    ),

    localizacaoAtual:
      animal.localizacaoAtual,

    castrado: parseBoolean(
      animal.castrado
    ),

    vacinado: parseBoolean(
      animal.vacinado
    ),

    vermifugado: parseBoolean(
      animal.vermifugado
    ),

    condicoesSaude:
      animal.condicoesSaude,

    personalidade:
      animal.personalidade,

    caes: animal.caes,

    gatos: animal.gatos,

    criancas: animal.criancas,

    energia: animal.energia,

    dataResgate: parseDate(
      animal.dataResgate
    ),

    historia: animal.historia,

    quemAdotou:
      animal.quemAdotou,

    dataAdocao: parseDate(
      animal.dataAdocao
    ),

    comoFoiAdotado:
      animal.comoFoiAdotado,

    contato: animal.contato,

    formulario:
      animal.formulario,

    assinouTermo:
      parseBoolean(
        animal.assinouTermo
      ),
  };
}