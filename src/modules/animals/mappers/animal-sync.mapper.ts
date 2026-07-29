import { InternalAnimal } from "@/types/animal";
import { AnimalSync } from "../types/animal-sync";

export function mapSyncToInternal(
  animal: AnimalSync
): InternalAnimal {

    const now = new Date().toISOString();

  return {
    id: animal.id,
    nome: animal.nome,
    status: animal.status,
    sexo: animal.sexo,
    porte: animal.porte,
    cores: animal.cores,
    raca: animal.raca,
    dataNascimento: animal.dataNascimento,
    idadeEstimada: animal.idadeEstimada,
    castrado: animal.castrado,
    vacinado: animal.vacinado,
    vermifugado: animal.vermifugado,
    condicoesSaude: animal.condicoesSaude,
    personalidade: animal.personalidade,
    caes: animal.caes,
    gatos: animal.gatos,
    criancas: animal.criancas,
    energia: animal.energia,
    dataResgate: animal.dataResgate,
    historia: animal.historia,
    fotos: [],

    origem: "sheet",
    visivelNoSite: animal.status === "DISPONIVEL",

    updatedFromSheetAt: now,
  };
}