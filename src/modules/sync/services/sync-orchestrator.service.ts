import { logger } from "@/shared/logger";
import { createSyncId } from "@/shared/logger/context";
import { LogModules } from "@/shared/logger/modules";
import { FullSyncResult } from "../types/sync.type";
import { syncAnimals } from "./sync.service";

export async function runFullSync(): Promise<FullSyncResult> {
  const syncId = createSyncId();
  const startedAt = new Date();

  logger.info("Iniciando sincronização", {
    syncId,
    module: LogModules.Sync,
  });

  try {
    const animalsResult = await syncAnimals();

    logger.info("Animais sincronizados", {
      syncId,
      animals: animalsResult.animalsUpserted,
      module: LogModules.Sync,
    });

    const finishedAt = new Date();

    logger.info("Sincronização da planilha finalizada", {
      syncId,
      durationMs:
        finishedAt.getTime() -
        startedAt.getTime(),
      module: LogModules.Sync,
    });

    return {
      animalsUpdated:
        animalsResult.animalsUpserted,

      imagesUpdated: 0,

      startedAt,

      finishedAt,

      durationMs:
        finishedAt.getTime() -
        startedAt.getTime(),

      success:
        animalsResult.errors.length === 0,

      warnings:
        animalsResult.errors.length > 0
          ? animalsResult.errors.map(
              (e) =>
                `[${e.operation}] ${e.animalName}: ${e.error}`,
            )
          : undefined,
    };
  } catch (error) {
    logger.error(
      "Erro durante a sincronização",
      {
        syncId,
        error:
          error instanceof Error
            ? error.message
            : String(error),
        module: LogModules.Sync,
      },
    );

    throw error;
  }
}
