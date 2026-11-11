import { supabaseAdmin } from "@/shared/lib/supabase/admin";
import { AnimalImageDB, AnimalImageInsert } from "@/types/animal-image";

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

// Imagens de vários animais numa única consulta, agrupadas por animal_id
export async function findImagesByAnimalIds(
  animalIds: string[]
) {
  const imagesByAnimal = new Map<string, AnimalImageDB[]>();

  if (animalIds.length === 0) {
    return imagesByAnimal;
  }

  const { data, error } = await supabaseAdmin
    .from("animal_images")
    .select("*")
    .in("animal_id", animalIds)
    .order("ordem");

  if (error) {
    throw error;
  }

  for (const image of data as AnimalImageDB[]) {
    imagesByAnimal.set(image.animal_id, [
      ...(imagesByAnimal.get(image.animal_id) ?? []),
      image,
    ]);
  }

  return imagesByAnimal;
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