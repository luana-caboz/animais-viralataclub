import { DriveImage } from "@/shared/integrations/google-drive/types";

export type SyncResult = {
  animalsUpserted: number;
  animalsRemoved: number;
  errors?: SyncError[];
  startedAt: Date;
  finishedAt: Date;
  durationMs: number;
};

export type SyncError = {
  operation: "upsert" | "delete";
  animalId: string;
  animalName?: string;
  error: string;
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
  errors?: string[];
};

export type FullSyncResult = {
  animalsUpdated: number;
  imagesUpdated: number;
  startedAt: Date;
  finishedAt: Date;
  durationMs: number;
  success: boolean;
  warnings?: string[];
};