import { listAnimalsFromDrive } from "@/shared/integrations/google-drive/drive.service";
import { logger } from "@/shared/logger";
import { LogModules } from "@/shared/logger/modules";
import { SyncImagesBatchResult, SyncImagesInput } from "../types/sync.type";
import { syncImagesBatch } from "./image-sync-batch.service";

export async function syncImages(
 { start,
  limit}
: SyncImagesInput): Promise<SyncImagesBatchResult> {
  logger.info("Iniciando lote da sincronização de imagens", {
    module: LogModules.SyncImages,
    start,
    limit,
  });

  const animals = await listAnimalsFromDrive();

  const batch = await syncImagesBatch(animals, start, limit);

   logger.info(
    "Lote de imagens concluído",
    {
      module: LogModules.SyncImages,
      processedAnimals:
        batch.processedAnimals,
      uploadedImages:
        batch.uploadedImages,
      hasMore: batch.hasMore,
      nextStart: batch.nextStart,
    },
  );

  return {
    processedAnimals: batch.processedAnimals,

    uploadedImages: batch.uploadedImages,

    totalAnimals: animals.length,

    nextStart: batch.nextStart,

    hasMore: batch.hasMore,

    errors: batch.errors,
  };
}
