import { mapSyncToInternal } from "@/modules/animals/mappers/animal-sync.mapper";
import { mapSheetAnimal } from "@/modules/animals/mappers/sheet-animal.mapper";
import { readAnimalsSheet } from "@/shared/integrations/google-sheets/google-sheets.service";
import { logger } from "@/shared/logger";
import { LogModules } from "@/shared/logger/modules";
import { SyncRepository } from "../repositories/sync.repository";
import { SyncResult } from "../types/sync.type";

export async function syncAnimals(): Promise<SyncResult> {
  logger.info("Iniciando sincronização de animais", {
    module: LogModules.SyncAnimals,
  });
  const sheet = await readAnimalsSheet();

  const animals = sheet
    .map(mapSheetAnimal)
    .map(mapSyncToInternal);

  const startedAt = new Date();
  const syncRepository = new SyncRepository();

  for (const animal of animals) {
    await syncRepository.upsertAnimal(animal);
  }

  const finishedAt = new Date();

  logger.info(
    "Animais sincronizados",
    {
      animalCount: animals.length,
      module: LogModules.SyncAnimals,
    }
  );

  return {
    animalsUpserted: animals.length,
    startedAt,
    finishedAt,
    durationMs:
      finishedAt.getTime() -
      startedAt.getTime(),
  };
}
