export const LogModules = {
  Sync: "sync",
  SyncAnimals: "sync-animals",
  SyncImages: "sync-images",
  GoogleSheets: "google-sheets",
  GoogleDrive: "google-drive",
  Cloudinary: "cloudinary",
} as const;

export type LogModule =
  (typeof LogModules)[keyof typeof LogModules];