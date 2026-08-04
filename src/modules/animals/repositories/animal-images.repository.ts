import { supabaseAdmin } from "@/shared/lib/supabase/admin";
import { AnimalImageInsert } from "@/types/animal-image";

export async function findImagesByAnimalId(
  animalId: string
) {
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

export async function findAllAnimalImages() {
  const supabase = supabaseAdmin;

  const { data, error } = await supabase
    .from("animal_images")
    .select("*")
    .order("ordem");

  if (error) {
    throw error;
  }

  return data;
}

export async function replaceAnimalImages(
  animalId: string,
  images: AnimalImageInsert[]
): Promise<void> {
  const supabase = supabaseAdmin;

  const { error } = await supabase.rpc(
    "replace_animal_images",
    {
      p_animal_id: animalId,
      p_images: images,
    }
  );

  if (error) {
    throw error;
  }
}