import { logger } from "@/shared/logger";
import { LogModules } from "@/shared/logger/modules";
import { syncAnimalImages } from "./sync-animal-images.service";

type DriveAnimal = Awaited<
  ReturnType<
    typeof import("@/shared/integrations/google-drive/drive.service").listAnimalsFromDrive
  >
>[number];

export type ImageBatchResult = {
  processedAnimals: number;
  uploadedImages: number;
  errors: string[];
  hasMore: boolean;
  nextStart: number;
};

export async function syncImagesBatch(
  animals: DriveAnimal[],
  start: number,
  limit: number,
): Promise<ImageBatchResult> {
  const batch = animals.slice(
    start,
    start + limit,
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