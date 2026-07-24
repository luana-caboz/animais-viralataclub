import { getIdFromSlug } from "@/lib/slug";
import { mapAnimal } from "@/mappers/animal.mapper";
import * as repository from "@/repositories/animal.repository";

export async function getAnimals() {
  try {
    const { data, error } = await repository.findAll();

    if (error) throw error;

    return data.map(mapAnimal);
  } catch {
    return [];
  }
}

export async function getAnimalById(
  id: string
) {
  try {
    const { data, error } = await repository.findById(id);

    if (error || !data) {
      return null;
    }

    return mapAnimal(data);
  } catch {
    return null;
  }
}

export async function getAnimalBySlug(slug: string) {
  const id = getIdFromSlug(slug);

  if (!id) {
    return null;
  }

  return getAnimalById(id);
}