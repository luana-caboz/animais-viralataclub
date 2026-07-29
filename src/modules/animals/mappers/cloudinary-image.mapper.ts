import { CloudinaryUpload } from "@/shared/integrations/cloudinary/types";
import { AnimalImageInsert } from "@/types/animal-image";

export function mapCloudinaryImage(
  animalId: string,
  upload: CloudinaryUpload,
  order: number
): AnimalImageInsert {
  return {
    animal_id: animalId,
    url: upload.secureUrl,
    cloudinary_public_id: upload.publicId,
    ordem: order,
    principal: order === 0,
  };
}