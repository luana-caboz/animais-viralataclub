import { mapCloudinaryImage } from "@/modules/animals/mappers/cloudinary-image.mapper";

import { createAnimalImages } from "@/modules/animals/repositories/animal-images.repository";
import { uploadImage } from "@/shared/integrations/cloudinary/service";
import {
    downloadImage,
    listAnimalsFromDrive,
} from "@/shared/integrations/google-drive/drive.service";
import { ImageSyncResult } from "../types/sync.type";

export async function syncImages(): Promise<ImageSyncResult> {
  const animals = await listAnimalsFromDrive();

  let imagesUpdated = 0;

  for (const animal of animals) {
    const imagesToInsert = [];

    for (const [index, image] of animal.images.entries()) {
        try {
            const buffer = await downloadImage(image.id);

            if(buffer.length === 0) {
                console.warn(`Erro ao baixar a imagem ${image.name} do animal ${animal.animalId}. O buffer está vazio.`);
                continue;
            }
     
            const uploaded = await uploadImage(
                buffer,
                animal.animalId,
                image.name
            );

            imagesToInsert.push(
                mapCloudinaryImage(
                animal.animalId,
                uploaded,
                index
                )
            );
        } catch (error) {
            console.error(`Erro ao processar a imagem ${image.name} do animal ${animal.animalId}:`, error);
        }
    }

    if (imagesToInsert.length > 0) {
      await createAnimalImages(imagesToInsert);

      imagesUpdated += imagesToInsert.length;
    }
  }

  return {
    animalsProcessed: animals.length,
    imagesUploaded: imagesUpdated,
    startedAt: new Date(),
    finishedAt: new Date(),
    durationMs: 0,
  };
}