import { useCallback, useState } from "react";

import { revalidatePathAction } from "@/app/actions/revalidate.action";
import { syncImagesBatchAction } from "@/app/actions/sync-image-batch.action";
import { syncNow } from "@/app/actions/sync.action";

const IMAGE_BATCH_SIZE = 20;

type SyncProgress = {
  processedAnimals: number;
  totalAnimals: number;
  uploadedImages: number;
};

export function useImageSync() {
  const [progress, setProgress] =
    useState<SyncProgress | null>(null);

  const [isRunning, setIsRunning] =
    useState(false);

  const executeFullSync =
    useCallback(async () => {
      setIsRunning(true);

      try {
        const animalsResult =
          await syncNow();

        let imagesUpdated = 0;

        let start = 0;

        let totalAnimals = 0;

        while (true) {
          const batch =
            await syncImagesBatchAction(
              start,
              IMAGE_BATCH_SIZE,
            );

          imagesUpdated +=
            batch.uploadedImages;

          totalAnimals =
            batch.totalAnimals;

          start =
            batch.nextStart;

          setProgress({
            processedAnimals:
              Math.min(start, totalAnimals),

            totalAnimals,

            uploadedImages:
              imagesUpdated,
          });

          if (!batch.hasMore) {
            break;
          }
        }

        await revalidatePathAction();

        return {
          ...animalsResult,
          imagesUpdated,
        };
      } finally {
        setIsRunning(false);
      }
    }, []);

  return {
    executeFullSync,
    progress,
    isRunning,
  };
}