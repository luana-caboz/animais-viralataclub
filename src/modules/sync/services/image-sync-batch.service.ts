import { findExistingAnimalIds } from "@/modules/animals/repositories/animal.repository";
import { logger } from "@/shared/logger";
import { LogModules } from "@/shared/logger/modules";
import { ImageBatchResult } from "../types/sync.type";
import { syncAnimalImages } from "./sync-animal-images.service";

type DriveAnimal = Awaited<
  ReturnType<
    typeof import("@/shared/integrations/google-drive/drive.service").listAnimalsFromDrive
  >
>[number];

export async function syncImagesBatch(
  animals: DriveAnimal[],
  start: number,
  limit: number,
): Promise<ImageBatchResult> {
  const batch = animals.slice(
    start,
    start + limit,
  );

  if (batch.length === 0) {
  return {
    processedAnimals: 0,
    uploadedImages: 0,
    errors: [],
    nextStart: start,
    hasMore: false,
  };
}

  const existingAnimals =
  await findExistingAnimalIds(
    batch.map(
      (animal) => animal.animalId,
    ),
  );
  let uploadedImages = 0;

  const errors: string[] = [];

  logger.info(
    "Processando lote de imagens",
    {
      module: LogModules.SyncImages,
      start,
      limit,
      batchSize: batch.length,
    },
  );

 for (const animal of batch) {
  if (
    !existingAnimals.has(
      animal.animalId,
    )
  ) {
    logger.warn(
      "Animal encontrado no Drive, mas não existe no banco.",
      {
        module: LogModules.SyncImages,
        animalId: animal.animalId,
        animalName:
          animal.animalName,
        folderId: animal.folderId,
      },
    );

    continue;
  }

    const result =
      await syncAnimalImages(animal);

    uploadedImages += result.uploaded;

    errors.push(...result.errors);
  }

  const nextStart = start + batch.length;

  return {
    processedAnimals: batch.length,
    uploadedImages,
    errors,
    nextStart,
    hasMore: nextStart < animals.length,
  };
}