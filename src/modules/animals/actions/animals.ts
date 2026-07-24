"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { supabase } from "@/lib/supabase";

type ActionResponse = {
  success?: boolean;
  error?: string;
};

export async function createAnimal(
  _prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  const payload = {
    id: formData.get("id"),
    nome: formData.get("nome"),
    status: formData.get("status"),

    sexo: formData.get("sexo"),
    porte: formData.get("porte"),
    cores: formData.get("cores"),
    raca: formData.get("raca"),

    data_nascimento:
      formData.get("dataNascimento"),

    castrado:
      formData.get("castrado") === "on",

    vacinado:
      formData.get("vacinado") === "on",

    vermifugado:
      formData.get("vermifugado") === "on",

    condicoes_saude:
      formData.get("condicoesSaude"),

    personalidade:
      formData.get("personalidade"),

    caes: formData.get("caes"),
    gatos: formData.get("gatos"),
    criancas: formData.get("criancas"),

    energia: formData.get("energia"),

    data_resgate:
      formData.get("dataResgate"),

    historia:
      formData.get("historia"),
  };

  const {
    data: existingAnimal,
    error: existingError,
  } = await supabase
    .from("animals")
    .select("id")
    .eq("id", payload.id)
    .maybeSingle();

  if (existingError) {
    return {
      error:
        "Erro ao validar ID do animal",
    };
  }

  if (existingAnimal) {
    return {
      error:
        "Já existe um animal com esse ID",
    };
  }

  const { error } = await supabase
    .from("animals")
    .insert(payload);

    if (error) {
      return {
        error:
          "Erro ao salvar animal",
      };
    }

  const images = JSON.parse(
    String(formData.get("images") ?? "[]")
  );

  if (images.length > 0) {
    const { error: imagesError } =
    await supabase
      .from("animal_images")
      .insert(
        images.map(
          (
            image: {
              url: string;
              ordem: number;
              principal: boolean;
              legenda?: string;
            }
          ) => ({
            animal_id: payload.id,
            url: image.url,
            ordem: image.ordem,
            principal: image.principal,
            legenda: image.legenda ?? null,
          })
        )
      );

  if (imagesError) {
    return {
      error:
        "Erro ao salvar imagens",
    };
  }
}

  revalidatePath("/admin/animals");

  redirect("/admin/animals");
}

export async function updateAnimal(
  id: string,
  _prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  const { error } = await supabase
    .from("animals")
    .update({
      nome: formData.get("nome"),
      status: formData.get("status"),

      sexo: formData.get("sexo"),
      porte: formData.get("porte"),
      cores: formData.get("cores"),
      raca: formData.get("raca"),

      data_nascimento:
        formData.get("dataNascimento"),

      castrado:
        formData.get("castrado") === "on",

      vacinado:
        formData.get("vacinado") === "on",

      vermifugado:
        formData.get("vermifugado") === "on",

      condicoes_saude:
        formData.get("condicoesSaude"),

      personalidade:
        formData.get("personalidade"),

      caes: formData.get("caes"),
      gatos: formData.get("gatos"),
      criancas: formData.get("criancas"),

      energia: formData.get("energia"),

      data_resgate:
        formData.get("dataResgate"),

      historia:
        formData.get("historia"),
    })

      if (error) {
        return {
          error:
            "Erro ao atualizar animal",
        };
      }

    await supabase
      .from("animal_images")
      .delete()
      .eq("animal_id", id);

    const images = JSON.parse(
      String(formData.get("images") ?? "[]")
    );
    
    if (images.length > 0) {
      const { error: imagesError } =
      await supabase
        .from("animal_images")
        .insert(
          images.map(
            (
             image: {
                url: string;
                ordem: number;
                principal: boolean;
                legenda?: string;
              }
            ) => ({
              animal_id: id,
              url: image.url,
              ordem: image.ordem,
              principal: image.principal,
              legenda: image.legenda ?? null,
            })
          )
        );

      if (imagesError) {
        return {
          error:
            "Erro ao salvar imagens",
        };
      }
    }

  revalidatePath("/admin/animals");

  redirect("/admin/animals");
}

export async function deleteAnimal(
  id: string
) {
  const { error } = await supabase
    .from("animals")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(
      "Error deleting animal:",
      error
    );

    throw new Error(
      "Erro ao excluir animal"
    );
  }

  revalidatePath("/admin/animals");
}