import { supabase } from "@/lib/supabase";
import { CreateAnimalDB } from "@/types/create-animal";

export async function findAll() {
  return supabase
    .from("animals")
    .select(`
        *,
        animal_images(*)
    `)
    .order("nome");
}

export async function findById(id: string) {
  return supabase
    .from("animals")
    .select(`
        *,
        animal_images(*)
    `)
    .eq("id", id)
    .single();
}

export async function create(payload: CreateAnimalDB) {
  return supabase
    .from("animals")
    .insert(payload);
}

export async function update(
  id: string,
  payload: Partial<CreateAnimalDB>
) {
  return supabase
    .from("animals")
    .update(payload)
    .eq("id", id);
}

export async function remove(id: string) {
  return supabase
    .from("animals")
    .delete()
    .eq("id", id);
}