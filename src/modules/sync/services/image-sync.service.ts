import { mapCloudinaryImage } from "@/modules/animals/mappers/cloudinary-image.mapper";
import {
  findAllAnimalImages,
  replaceAnimalImages,
} from "@/modules/animals/repositories/animal-images.repository";
import { uploadImage } from "@/shared/integrations/cloudinary/service";
import {
  downloadImage,
  listAnimalsFromDrive,
} from "@/shared/integrations/google-drive/drive.service";
import { logger } from "@/shared/logger";
import { LogModules } from "@/shared/logger/modules";
import { AnimalImageDB, AnimalImageInsert } from "@/types/animal-image";
import { ImageSyncResult } from "../types/sync.type";
import { hasImagesChanged } from "../utils/image-sync.util";

export async function syncImages(): Promise<ImageSyncResult> {
  const startedAt = new Date();

  logger.info("Iniciando sincronização de imagens", {
    module: LogModules.SyncImages,
  });

  const animals = await listAnimalsFromDrive();

  const dbImages = await findAllAnimalImages();

  const imagesByAnimal = new Map<string, AnimalImageDB[]>();

  for (const image of dbImages) {
    const current =
      imagesByAnimal.get(image.animal_id) ?? [];

    current.push(image);

    imagesByAnimal.set(image.animal_id, current);
  }

  let imagesUpdated = 0;
  const errors: string[] = [];

  for (const animal of animals) {
    const currentImages =
      imagesByAnimal.get(animal.animalId) ?? [];

    if (
      !hasImagesChanged(
        animal.images,
        currentImages
      )
    ) {
      logger.info(
        "Imagens sem alterações. Sincronização ignorada.",
        {
          module: LogModules.SyncImages,
          animalId: animal.animalId,
        }
      );

      continue;
    }

    const imagesToReplace: AnimalImageInsert[] = [];

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

        const uploaded = await uploadImage(
          buffer,
          animal.animalId,
          image.name
        );

        imagesToReplace.push(
          mapCloudinaryImage(
            animal.animalId,
            image,
            uploaded,
            index
          )
        );
      } catch (error) {
        const message = `Erro ao processar ${image.name} do animal ${animal.animalId}`;

        logger.error(message, {
          module: LogModules.SyncImages,
          animalId: animal.animalId,
          image: image.name,
          error:
            error instanceof Error
              ? error.message
              : String(error),
        });

        errors.push(message);
      }
    }

    if (imagesToReplace.length === 0) {
      continue;
    }

    try {
      await replaceAnimalImages(
        animal.animalId,
        imagesToReplace
      );

      imagesUpdated += imagesToReplace.length;

      logger.info("Imagens sincronizadas", {
        module: LogModules.SyncImages,
        animalId: animal.animalId,
        total: imagesToReplace.length,
      });
    } catch (error) {
      const message = `Erro ao substituir imagens do animal ${animal.animalId}`;

      logger.error(message, {
        module: LogModules.SyncImages,
        animalId: animal.animalId,
        error:
          error instanceof Error
            ? error.message
            : String(error),
      });

      errors.push(message);
    }
  }

  const finishedAt = new Date();

  const durationMs =
    finishedAt.getTime() - startedAt.getTime();

  logger.info(
    "Sincronização de imagens concluída",
    {
      module: LogModules.SyncImages,
      animals: animals.length,
      images: imagesUpdated,
      errors: errors.length,
      durationMs,
    }
  );

  return {
    animalsProcessed: animals.length,
    imagesUploaded: imagesUpdated,
    startedAt,
    finishedAt,
    durationMs,
    errors,
  };
}