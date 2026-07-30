import { mapCloudinaryImage } from "@/modules/animals/mappers/cloudinary-image.mapper";

import { createAnimalImages } from "@/modules/animals/repositories/animal-images.repository";
import { uploadImage } from "@/shared/integrations/cloudinary/service";
import {
  downloadImage,
  listAnimalsFromDrive,
} from "@/shared/integrations/google-drive/drive.service";
import { logger } from "@/shared/logger";
import { LogModules } from "@/shared/logger/modules";
import { ImageSyncResult } from "../types/sync.type";

export async function syncImages(): Promise<ImageSyncResult> {
  const startedAt = new Date();
  logger.info("Iniciando sincronização de imagens", {
    module: LogModules.SyncImages,
  });
  const animals = await listAnimalsFromDrive();

  let imagesUpdated = 0;
  const errors: string[] = [];

  for (const animal of animals) {
    const imagesToInsert = [];

    for (const [index, image] of animal.images.entries()) {
      try {
        const buffer = await downloadImage(image.id);

        if (buffer.length === 0) {
          const message = `Imagem ${image.name} do animal ${animal.animalId} retornou vazia.`;

          logger.warn(message, {
            module: LogModules.SyncImages,
            animalId: animal.animalId,
            image: image.name,
          });

          errors.push(message);

          continue;
        }

        const uploaded = await uploadImage(buffer, animal.animalId, image.name);

        imagesToInsert.push(
          mapCloudinaryImage(animal.animalId, uploaded, index),
        );
      } catch (error) {
        const message = `Erro ao processar ${image.name} do animal ${animal.animalId}`;

        logger.error(message, {
          module: LogModules.SyncImages,
          animalId: animal.animalId,
          image: image.name,
          error: error instanceof Error ? error.message : String(error),
        });

        errors.push(message);

        continue;
      }
    }

    if (imagesToInsert.length > 0) {
      await createAnimalImages(imagesToInsert);

      imagesUpdated += imagesToInsert.length;

      logger.info("Imagens sincronizadas", {
        module: LogModules.SyncImages,
        animalId: animal.animalId,
        total: imagesToInsert.length,
      });
    }
  }

  const finishedAt = new Date();

  const durationMs = finishedAt.getTime() - startedAt.getTime();

  logger.info("Sincronização de imagens concluída", {
    module: LogModules.SyncImages,

    animals: animals.length,

    images: imagesUpdated,

    errors: errors.length,

    durationMs,
  });
  return {
    animalsProcessed: animals.length,
    imagesUploaded: imagesUpdated,
    startedAt: new Date(),
    finishedAt: new Date(),
    durationMs: durationMs,
    errors,
  };
}
