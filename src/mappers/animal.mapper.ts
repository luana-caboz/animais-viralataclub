import { Animal } from "@/types/animal";
import { AnimalDB } from "@/types/animal-db";

function calcularIdade(
  dataNascimento: string
) {
  const nascimento = new Date(dataNascimento);
  const hoje = new Date();

  let anos =
    hoje.getFullYear() -
    nascimento.getFullYear();

  if (
    hoje.getMonth() <
    nascimento.getMonth()
  ) {
    anos--;
  }

  return `${anos} ano(s)`;
}

export function mapAnimal(
  animal: AnimalDB
): Animal {
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

    fotoUrl:
      animal.foto_url,
  };
}

export function mapAnimalToDB(
  animal: Partial<Animal>
): Partial<AnimalDB> {
  return {
    id: animal.id,
    nome: animal.nome,
    status: animal.status,

    sexo: animal.sexo,
    porte: animal.porte,
    cores: animal.cores,
    raca: animal.raca,

    data_nascimento:
      animal.dataNascimento,

    castrado: animal.castrado,
    vacinado: animal.vacinado,
    vermifugado: animal.vermifugado,

    condicoes_saude:
      animal.condicoesSaude,

    personalidade:
      animal.personalidade,

    caes: animal.caes,
    gatos: animal.gatos,
    criancas: animal.criancas,

    energia: animal.energia,

    data_resgate:
      animal.dataResgate,

    historia: animal.historia,

    foto_url:
      animal.fotoUrl,
  };
}