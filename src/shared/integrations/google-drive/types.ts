export type DriveImage = {
  id: string;
  name: string;
  mimeType: string;
};

export type DriveAnimalFolder = {
  folderId: string;
  animalId: string;
  animalName: string;
  status: "DISPONIVEL" | "ADOTADO";
  images: DriveImage[];
};