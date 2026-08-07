export type DriveImage = {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime?: string;
  md5Checksum?: string;
};

export type DriveAnimalFolder = {
  folderId: string;
  animalId: string;
  animalName: string;
  status: string;
};

export type DriveAnimal = DriveAnimalFolder & {
  images: DriveImage[];
};