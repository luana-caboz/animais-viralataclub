import { DriveImage } from "@/shared/integrations/google-drive/types";

export type SyncResult = {
  animalsUpserted: number;
  startedAt: Date;
  finishedAt: Date;
  durationMs: number;
};

export type DriveAnimalFolder = {
  folderId: string;
  animalId: string;
  animalName: string;
  status: "DISPONIVEL" | "ADOTADO";
  images: DriveImage[];
};

export type ImageSyncResult = {
  animalsProcessed: number;
  imagesUploaded: number;
  startedAt: Date;
  finishedAt: Date;
  durationMs: number;
};