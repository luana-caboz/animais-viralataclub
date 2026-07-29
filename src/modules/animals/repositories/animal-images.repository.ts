import { supabaseAdmin } from "@/shared/lib/supabase/admin";
import { AnimalImageInsert } from "@/types/animal-image";

export async function findImagesByAnimalId(
  animalId: string
): Promise<AnimalImageInsert[]> {
  const supabase = supabaseAdmin;

  const { data, error } = await supabase
    .from("animal_images")
    .select("*")
    .eq("animal_id", animalId)
    .order("ordem");

  if (error) {
    throw error;
  }

  return data;
}

export async function createAnimalImages(
  images: AnimalImageInsert[]
) {
  const supabase = supabaseAdmin;

  const { error } = await supabase
    .from("animal_images")
    .insert(images);

  if (error) {
    throw error;
  }
}

export async function deleteAnimalImages(
  animalId: string
) {
  const supabase = await supabaseAdmin;

  const { error } = await supabase
    .from("animal_images")
    .delete()
    .eq("animal_id", animalId);

  if (error) {
    throw error;
  }
}