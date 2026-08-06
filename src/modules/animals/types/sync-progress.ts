export type SyncProgress = {
  totalAnimals: number;

  processedAnimals: number;

  uploadedImages: number;

  percentage: number;

  currentBatch: number;

  totalBatches: number;

  isRunning: boolean;
};