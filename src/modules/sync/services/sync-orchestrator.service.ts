import { logger } from "@/shared/logger";
import { createSyncId } from "@/shared/logger/context";
import { LogModules } from "@/shared/logger/modules";
import { FullSyncResult } from "../types/sync.type";
import { syncImages } from "./image-sync.service";
import { syncAnimals } from "./sync.service";

export async function runFullSync(): Promise<FullSyncResult> {
  const syncId = createSyncId();
  const startedAt = new Date();

  logger.info("Iniciando sincronização", { syncId, module: LogModules.Sync });

  try {
    const animalsResult = await syncAnimals();

    logger.info("Animais sincronizados", {
      syncId,
      animals: animalsResult.animalsUpserted,
      module: LogModules.Sync,
    });

    const imagesResult = await syncImages();

    logger.info("Imagens sincronizadas", {
      syncId,
      images: imagesResult.imagesUploaded,
      module: LogModules.Sync,
    });

    const finishedAt = new Date();

    logger.info("Sincronização finalizada", {
      syncId,
      durationMs: finishedAt.getTime() - startedAt.getTime(),
      module: LogModules.Sync,
    });

    return {
      animalsUpdated: animalsResult.animalsUpserted,

      imagesUpdated: imagesResult.imagesUploaded,

      startedAt,

      finishedAt,

      durationMs: finishedAt.getTime() - startedAt.getTime(),

      success:
        animalsResult.animalsUpserted > 0 || imagesResult.imagesUploaded > 0,

      warnings: imagesResult.errors?.length ? imagesResult.errors : undefined,
    };
  } catch (error) {
    logger.error("Erro durante a sincronização", {
      syncId,
      error: error instanceof Error ? error.message : String(error),
      module: LogModules.Sync,
    });

    throw error;
  }
}
