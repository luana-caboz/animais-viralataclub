import { getIdFromSlug } from "@/lib/slug";
import { mapAnimal } from "@/mappers/animal.mapper";
import { supabase } from "./supabase";

export async function getAnimals() {
  const { data, error } = await supabase
    .from("animals")
    .select(`
        *,
        animal_images(*)
    `)
    .order("nome");

  if (error) {
    throw error;
  }

  return data.map(mapAnimal);
}

export async function getAnimalById(
  id: string
) {
  const { data, error } = await supabase
    .from("animals")
    .select(`
        *,
        animal_images(*)
    `)
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }

  return mapAnimal(data);
}

export async function getAnimalBySlug(
  slug: string
) {
  const id = getIdFromSlug(slug);

  if (!id) {
    return null;
  }

  return getAnimalById(id);
}