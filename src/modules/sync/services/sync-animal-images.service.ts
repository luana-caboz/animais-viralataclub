import { mapCloudinaryImage } from "@/modules/animals/mappers/cloudinary-image.mapper";
import {
    findImagesByAnimalId,
    replaceAnimalImages,
} from "@/modules/animals/repositories/animal-images.repository";
import { uploadImage } from "@/shared/integrations/cloudinary/service";
import { downloadImage } from "@/shared/integrations/google-drive/drive.service";
import { logger } from "@/shared/logger";
import { LogModules } from "@/shared/logger/modules";
import { hasImagesChanged } from "../utils/image-sync.util";

type DriveAnimal = {
  animalId: string;
  animalName: string;
  images: {
    id: string;
    name: string;
    
    mimeType: string;
    md5Checksum?: string;
  }[];
};

export async function syncAnimalImages(
  animal: DriveAnimal
): Promise<{
  uploaded: number;
  errors: string[];
}> {
  const errors: string[] = [];

  const currentImages =
    await findImagesByAnimalId(animal.animalId);

  if (
    !hasImagesChanged(
      animal.images,
      currentImages
    )
  ) {
    logger.info(
      "Imagens inalteradas. Pulando sincronização.",
      {
        module: LogModules.SyncImages,
        animalId: animal.animalId,
      }
    );

    return {
      uploaded: 0,
      errors,
    };
  }

  const imagesToInsert = [];

  for (const [index, image] of animal.images.entries()) {
    try {
      const buffer =
        await downloadImage(image.id);

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

      const uploaded =
        await uploadImage(
          buffer,
          animal.animalId,
          image.name
        );

      imagesToInsert.push(
        mapCloudinaryImage(
          animal.animalId,
          image,
          uploaded,
          index
        )
      );
    } catch (error) {
      const message =
        `Erro ao processar ${image.name} do animal ${animal.animalId}`;

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

  if (imagesToInsert.length > 0) {
    await replaceAnimalImages(
      animal.animalId,
      imagesToInsert
    );

    logger.info("Imagens sincronizadas", {
      module: LogModules.SyncImages,
      animalId: animal.animalId,
      total: imagesToInsert.length,
    });
  }

  return {
    uploaded: imagesToInsert.length,
    errors,
  };
}