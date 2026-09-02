import type { AnimalImageInsert } from "@/modules/animals/types/animal-image";
import type { CloudinaryUpload } from "@/shared/integrations/cloudinary/types";
import type { DriveImage } from "@/shared/integrations/google-drive/types";

export function mapCloudinaryImage(
  animalId: string,
  driveImage: DriveImage,
  upload: CloudinaryUpload,
  order: number
): AnimalImageInsert {
  return {
    animal_id: animalId,
    url: upload.secureUrl,
    cloudinary_public_id: upload.publicId,
    drive_file_id: driveImage.id,
    drive_md5: driveImage.md5Checksum,
    drive_modified_time: driveImage.modifiedTime,
    ordem: order,
    principal: order === 0,
  };
}
