import { CloudinaryUpload } from "@/shared/integrations/cloudinary/types";
import { DriveImage } from "@/shared/integrations/google-drive/types";
import { AnimalImageInsert } from "@/types/animal-image";

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