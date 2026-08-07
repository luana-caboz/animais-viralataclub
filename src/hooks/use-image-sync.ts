import { useCallback, useState } from "react";

import { revalidatePathAction } from "@/app/actions/revalidate.action";
import { syncImagesBatchAction } from "@/app/actions/sync-image-batch.action";
import { syncNow } from "@/app/actions/sync.action";

const IMAGE_BATCH_SIZE = 20;

export type SyncProgress = {
  processedAnimals: number;
  totalAnimals: number;
  uploadedImages: number;
};

type SyncState = {
  animalsUpdated: number;
  imagesUpdated: number;
  durationMs: number;
  success: boolean;
};

export function useImageSync() {
  const [progress, setProgress] =
    useState<SyncProgress | null>(null);

  const [lastSync, setLastSync] =
    useState<SyncState | null>(null);

  const [isRunning, setIsRunning] =
    useState(false);

  const executeFullSync =
    useCallback(async () => {
      setIsRunning(true);

      setProgress(null);

      try {
        const animalsResult =
          await syncNow();

        let uploadedImages = 0;

        let start = 0;

        let totalAnimals = 0;

        while (true) {
          const batch =
            await syncImagesBatchAction(
              start,
              IMAGE_BATCH_SIZE,
            );

          uploadedImages +=
            batch.uploadedImages;

          totalAnimals =
            batch.totalAnimals;

          start =
            batch.nextStart;

          setProgress({
            processedAnimals:
              Math.min(
                start,
                totalAnimals,
              ),
            totalAnimals,
            uploadedImages,
          });

          if (!batch.hasMore) {
            break;
          }

          await new Promise<void>(
            (resolve) =>
              setTimeout(resolve, 0),
          );
        }

        await revalidatePathAction();

        const result = {
          animalsUpdated:
            animalsResult.animalsUpdated,

          imagesUpdated:
            uploadedImages,

          durationMs:
            animalsResult.durationMs,

          success:
            animalsResult.success,
        };

        setLastSync(result);

        return result;
      } finally {
        setIsRunning(false);
      }
    }, []);

  return {
    executeFullSync,
    progress,
    lastSync,
    isRunning,
  };
}