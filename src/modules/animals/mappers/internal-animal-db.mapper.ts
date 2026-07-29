import { InternalAnimal } from "@/types/animal";

export function mapInternalToDatabase(
  animal: InternalAnimal
) {
  return {
    id: animal.id,
    nome: animal.nome,
    status: animal.status,

    sexo: animal.sexo,
    porte: animal.porte,
    cores: animal.cores,
    raca: animal.raca,

    data_nascimento:
      animal.dataNascimento || null,

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
      animal.dataResgate || null,

    historia: animal.historia,

    localizacao_atual:
      animal.localizacaoAtual,

    quem_adotou:
      animal.quemAdotou,

    data_adocao:
      animal.dataAdocao || null,

    como_foi_adotado:
      animal.comoFoiAdotado,

    contato: animal.contato,

    formulario:
      animal.formulario,

    assinou_termo:
      animal.assinouTermo,

    origem: animal.origem,

    updated_from_sheet_at:
      animal.updatedFromSheetAt,

    visivel_no_site:
      animal.visivelNoSite,
  };
}