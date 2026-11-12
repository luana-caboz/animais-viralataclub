import { findImagesByAnimalIds } from "@/modules/animals/repositories/animal-images.repository";
import { findExistingAnimalIds } from "@/modules/animals/repositories/animal.repository";
import { DriveAnimal } from "@/shared/integrations/google-drive/types";
import { logger } from "@/shared/logger";
import { LogModules } from "@/shared/logger/modules";
import { mapWithConcurrency } from "@/shared/utils/concurrency";
import { ImageBatchResult } from "../types/sync.type";
import { syncAnimalImages } from "./sync-animal-images.service";

// Animais processados ao mesmo tempo (cada um já envia suas fotos em paralelo)
const ANIMAL_CONCURRENCY = 3;

export async function syncImagesBatch(
  animals: DriveAnimal[],
): Promise<ImageBatchResult> {
  if (animals.length === 0) {
    return {
      processedAnimals: 0,
      uploadedImages: 0,
      errors: [],
    };
  }

  const animalIds = animals.map((animal) => animal.animalId);

  const [existingAnimals, imagesByAnimal] = await Promise.all([
    findExistingAnimalIds(animalIds),
    findImagesByAnimalIds(animalIds),
  ]);

  let uploadedImages = 0;

  const errors: string[] = [];

  logger.info("Processando lote de imagens", {
    module: LogModules.SyncImages,
    batchSize: animals.length,
  });

  await mapWithConcurrency(animals, ANIMAL_CONCURRENCY, async (animal) => {
    if (!existingAnimals.has(animal.animalId)) {
      logger.warn("Animal encontrado no Drive, mas não existe no banco.", {
        module: LogModules.SyncImages,
        animalId: animal.animalId,
        animalName: animal.animalName,
        folderId: animal.folderId,
      });

      return;
    }

    try {
      const result = await syncAnimalImages(
        animal,
        imagesByAnimal.get(animal.animalId) ?? [],
      );

      uploadedImages += result.uploaded;

      errors.push(...result.errors);
    } catch (error) {
      const message = `Erro ao sincronizar imagens do animal ${animal.animalId}`;

      logger.error(message, {
        module: LogModules.SyncImages,
        animalId: animal.animalId,
        animalName: animal.animalName,
        error: error instanceof Error ? error.message : String(error),
      });

      errors.push(message);
    }
  });

  return {
    processedAnimals: animals.length,
    uploadedImages,
    errors,
  };
}
