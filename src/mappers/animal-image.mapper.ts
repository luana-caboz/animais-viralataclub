import { AnimalImage, AnimalImageDB } from "@/types/animal-image";


export function mapAnimalImageFromDB(
  data: AnimalImageDB
): AnimalImage {
  return {
    id: data.id,
    animalId: data.animal_id,

    url: data.url,
    legenda: data.legenda ?? undefined,

    ordem: data.ordem,
    principal: data.principal,
  };
}

export function mapAnimalImageToDB(
  image: AnimalImage
): Omit<AnimalImageDB, "created_at"> {
  return {
    id: image.id,
    animal_id: image.animalId,

    url: image.url,
    legenda: image.legenda ?? null,

    ordem: image.ordem,
    principal: image.principal,
  };
}