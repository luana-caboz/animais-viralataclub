import { DriveImage } from "@/shared/integrations/google-drive/types";
import { AnimalImageDB } from "@/types/animal-image";

export function hasImagesChanged(
  driveImages: DriveImage[],
  dbImages: AnimalImageDB[],
): boolean {
  if (driveImages.length !== dbImages.length) {
    return true;
  }

  const dbByDriveId = new Map(
    dbImages.map((image) => [
      image.drive_file_id,
      image,
    ]),
  );

  for (const driveImage of driveImages) {
    const dbImage = dbByDriveId.get(
      driveImage.id,
    );

    if (!dbImage) {
      return true;
    }

    if (
      dbImage.drive_md5 !==
      driveImage.md5Checksum
    ) {
      return true;
    }
  }

  return false;
}