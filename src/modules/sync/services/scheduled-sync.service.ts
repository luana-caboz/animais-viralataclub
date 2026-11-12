import { revalidatePath } from "next/cache";

import { logger } from "@/shared/logger";
import { LogModules } from "@/shared/logger/modules";
import { syncImages } from "./image-sync.service";
import { runFullSync } from "./sync-orchestrator.service";

const IMAGE_BATCH_SIZE = 20;

// Margem para não estourar o maxDuration da rota (300s): não inicia um lote
// novo depois desse tempo. Como a sync de imagens é incremental, o que ficar
// pendente é processado na próxima execução.
const IMAGE_SYNC_BUDGET_MS = 200_000;

// Mesmo fluxo do botão "Sincronizar" do admin (useImageSync), executado no servidor
export async function runScheduledSync() {
  const startedAt = Date.now();

  const animalsResult = await runFullSync();

  let uploadedImages = 0;
  let start = 0;
  let totalAnimals = 0;
  let hasMore = true;
  const imageErrors: string[] = [];

  while (hasMore && Date.now() - startedAt < IMAGE_SYNC_BUDGET_MS) {
    const batch = await syncImages({ start, limit: IMAGE_BATCH_SIZE });

    uploadedImages += batch.uploadedImages;
    totalAnimals = batch.totalAnimals;
    start = batch.nextStart;
    hasMore = batch.hasMore;
    imageErrors.push(...batch.errors);
  }

  if (hasMore) {
    logger.warn("Sync agendada interrompida por tempo; restante fica para a próxima", {
      module: LogModules.SyncImages,
      processedAnimals: start,
      totalAnimals,
    });
  }

  revalidatePath("/");
  revalidatePath("/admin");

  return {
    animalsUpdated: animalsResult.animalsUpdated,
    imagesUpdated: uploadedImages,
    processedAnimals: start,
    totalAnimals,
    imagesComplete: !hasMore,
    durationMs: Date.now() - startedAt,
    success: animalsResult.success && imageErrors.length === 0,
    warnings: animalsResult.warnings,
    imageErrors: imageErrors.length > 0 ? imageErrors : undefined,
  };
}
