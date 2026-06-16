"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function createAnimal(
  formData: FormData
) {
  console.log("ACTION EXECUTOU");

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

    foto_url:
      formData.get("fotoUrl"),
  };

  console.log("PAYLOAD", payload);

  const { error } = await supabase
    .from("animals")
    .insert(payload);

  if (error) {
    console.error("Error inserting animal:", error);
    throw new Error(error.message);
  }

revalidatePath("/admin/animals");

redirect("/admin/animals");
}

export async function updateAnimal(
  id: string,
  formData: FormData
) {
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

      foto_url:
        formData.get("fotoUrl"),
    })
    .eq("id", id);

  revalidatePath("/admin/animals");
  redirect("/admin/animals");
}

export async function deleteAnimal(
  id: string
) {
  await supabase
    .from("animals")
    .delete()
    .eq("id", id);

  revalidatePath("/admin/animals");
}