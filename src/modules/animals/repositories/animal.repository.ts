import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/shared/lib/supabase/admin";
import { CreateAnimalDB } from "@/types/create-animal";

export async function findAll() {
  return supabase
    .from("animals")
    .select(
      `
        *,
        animal_images(*)
    `,
    )
    .eq("visivel_no_site", true)
    .order("nome");
}

export async function findById(id: string) {
  return supabase
    .from("animals")
    .select(
      `
        *,
        animal_images(*)
    `,
    )
    .eq("id", id)
    .single();
}

export async function create(payload: CreateAnimalDB) {
  return supabase.from("animals").insert(payload);
}

export async function update(id: string, payload: Partial<CreateAnimalDB>) {
  return supabase.from("animals").update(payload).eq("id", id);
}

export async function remove(id: string) {
  return supabase.from("animals").delete().eq("id", id);
}

export async function existsAnimal(id: string): Promise<boolean> {
  const { data, error } = await supabaseAdmin
    .from("animals")
    .select("id")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return !!data;
}

export async function findExistingAnimalIds(
  ids: string[],
): Promise<Set<string>> {
  if (ids.length === 0) {
    return new Set();
  }

  const { data, error } = await supabaseAdmin
    .from("animals")
    .select("id")
    .in("id", ids);

  if (error) {
    throw error;
  }

  return new Set(data.map((animal) => animal.id));
}
