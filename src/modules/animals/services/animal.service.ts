import { getIdFromSlug } from "@/lib/slug";
import { mapAnimal } from "@/mappers/animal.mapper";
import * as repository from "@/repositories/animal.repository";

export async function getAnimals() {
  const { data, error } =
    await repository.findAll();

  if (error) throw error;

  return data.map(mapAnimal);
}

export async function getAnimalById(
  id: string
) {
  const { data, error } =
    await repository.findById(id);

  if (error || !data) {
    return null;
  }

  return mapAnimal(data);
}

export async function getAnimalBySlug(slug: string) {
  const id = getIdFromSlug(slug);

  if (!id) {
    return null;
  }

  return getAnimalById(id);
}