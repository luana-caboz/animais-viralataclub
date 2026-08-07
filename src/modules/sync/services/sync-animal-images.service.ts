import { mapCloudinaryImage } from "@/modules/animals/mappers/cloudinary-image.mapper";
import {
  findImagesByAnimalId,
  replaceAnimalImages,
} from "@/modules/animals/repositories/animal-images.repository";
import { uploadImage } from "@/shared/integrations/cloudinary/service";
import { downloadImage } from "@/shared/integrations/google-drive/drive.service";
import { logger } from "@/shared/logger";
import { LogModules } from "@/shared/logger/modules";
import { AnimalImageInsert } from "@/types/animal-image";
import { hasImagesChanged } from "../utils/image-sync.util";

type DriveAnimal = {
  animalId: string;
  animalName: string;
  images: {
    id: string;
    name: string;
    mimeType: string;
    md5Checksum?: string;
    modifiedTime?: string;
  }[];
};

type SyncAnimalImagesResult = {
  uploaded: number;
  errors: string[];
};

export async function syncAnimalImages(
  animal: DriveAnimal,
): Promise<SyncAnimalImagesResult> {
  const errors: string[] = [];

  const currentImages = await findImagesByAnimalId(animal.animalId);

  if (!hasImagesChanged(animal.images, currentImages)) {
    logger.info("Imagens inalteradas. Pulando sincronização.", {
      module: LogModules.SyncImages,
      animalId: animal.animalId,
      animalName: animal.animalName,
    });

    return {
      uploaded: 0,
      errors,
    };
  }

  logger.info("Alterações nas imagens detectadas", {
    module: LogModules.SyncImages,
    animalId: animal.animalId,
    animalName: animal.animalName,
    totalImages: animal.images.length,
  });

  const results = await Promise.all(
    animal.images.map(
      async (image, index): Promise<AnimalImageInsert | null> => {
        try {
          const buffer = await downloadImage(image.id);

          if (buffer.length === 0) {
            const message = `Imagem ${image.name} do animal ${animal.animalId} retornou vazia.`;

            logger.warn(message, {
              module: LogModules.SyncImages,
              animalId: animal.animalId,
              animalName: animal.animalName,
              image: image.name,
            });

            errors.push(message);

            return null;
          }

          const uploaded = await uploadImage(
            buffer,
            animal.animalId,
            image.name,
          );

          return mapCloudinaryImage(animal.animalId, image, uploaded, index);
        } catch (error) {
          const message = `Erro ao processar ${image.name} do animal ${animal.animalId}`;

          logger.error(message, {
            module: LogModules.SyncImages,
            animalId: animal.animalId,
            animalName: animal.animalName,
            image: image.name,
            error: error instanceof Error ? error.message : String(error),
          });

          errors.push(message);

          return null;
        }
      },
    ),
  );

const imagesToReplace =
  results
    .filter(
      (
        image,
      ): image is AnimalImageInsert =>
        image !== null,
    )
    .map((image, index) => ({
      ...image,
      ordem: index,
      principal: index === 0,
    }));

  if (imagesToReplace.length === 0) {
    logger.warn(
      "Nenhuma imagem foi processada com sucesso. Banco não alterado.",
      {
        module: LogModules.SyncImages,
        animalId: animal.animalId,
        animalName: animal.animalName,
      },
    );

    return {
      uploaded: 0,
      errors,
    };
  }

  try {
    await replaceAnimalImages(animal.animalId, imagesToReplace);

    logger.info("Imagens do animal sincronizadas", {
      module: LogModules.SyncImages,
      animalId: animal.animalId,
      animalName: animal.animalName,
      totalImagesInDrive: animal.images.length,
      imagesUploaded: imagesToReplace.length,
      failedImages: animal.images.length - imagesToReplace.length,
    });

    return {
      uploaded: imagesToReplace.length,
      errors,
    };
  } catch (error) {
    const message = `Erro ao substituir imagens do animal ${animal.animalId}`;

    logger.error(message, {
      module: LogModules.SyncImages,
      animalId: animal.animalId,
      animalName: animal.animalName,
      error: error instanceof Error ? error.message : String(error),
    });

    errors.push(message);

    return {
      uploaded: 0,
      errors,
    };
  }
}
