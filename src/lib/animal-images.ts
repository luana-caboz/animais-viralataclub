import { supabase } from "@/lib/supabase";
import {
  mapAnimalImageFromDB,
  mapAnimalImageToDB,
} from "@/mappers/animal-image.mapper";
import { AnimalImage } from "@/types/animal-image";

export async function getAnimalImages(
  animalId: string
): Promise<AnimalImage[]> {
  const { data, error } = await supabase
    .from("animal_images")
    .select("*")
    .eq("animal_id", animalId)
    .order("ordem");

  if (error) {
    throw new Error(error.message);
  }

  return data.map(mapAnimalImageFromDB);
}

export async function createAnimalImage(
  image: AnimalImage
) {
  const payload =
    mapAnimalImageToDB(image);

  const { error } = await supabase
    .from("animal_images")
    .insert(payload);

  if (error) {
    throw new Error(error.message);
  }
}

/**
 * Cria várias imagens de uma única vez.
 */
export async function createAnimalImages(
  images: AnimalImage[]
) {
  if (!images.length) return;

  const payload = images.map(
    mapAnimalImageToDB
  );

  const { error } = await supabase
    .from("animal_images")
    .insert(payload);

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateAnimalImage(
  image: AnimalImage
) {
  const payload =
    mapAnimalImageToDB(image);

  const { error } = await supabase
    .from("animal_images")
    .update(payload)
    .eq("id", image.id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteAnimalImage(
  id: string
) {
  const { error } = await supabase
    .from("animal_images")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function setPrincipalImage(
  animalId: string,
  imageId: string
) {
  const { error: updateAllError } =
    await supabase
      .from("animal_images")
      .update({
        principal: false,
      })
      .eq("animal_id", animalId);

  if (updateAllError) {
    throw new Error(
      updateAllError.message
    );
  }

  const { error } =
    await supabase
      .from("animal_images")
      .update({
        principal: true,
      })
      .eq("id", imageId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function reorderAnimalImages(
  images: AnimalImage[]
) {
  const updates = images.map(
    (image, index) =>
      supabase
        .from("animal_images")
        .update({
          ordem: index,
        })
        .eq("id", image.id)
  );

  const results =
    await Promise.all(updates);

  const failed = results.find(
    (result) => result.error
  );

  if (failed?.error) {
    throw new Error(
      failed.error.message
    );
  }
}

export async function replaceAnimalImages(
  animalId: string,
  images: AnimalImage[]
) {
  const { error: deleteError } =
    await supabase
      .from("animal_images")
      .delete()
      .eq("animal_id", animalId);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  if (!images.length) {
    return;
  }

  await createAnimalImages(images);
}