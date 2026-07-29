import { mapSyncToInternal } from "@/modules/animals/mappers/animal-sync.mapper";
import { mapSheetAnimal } from "@/modules/animals/mappers/sheet-animal.mapper";
import { readAnimalsSheet } from "@/shared/integrations/google-sheets/google-sheets.service";
import { SyncRepository } from "../repositories/sync.repository";
import { SyncResult } from "../types/sync.type";

export async function syncAnimals(): Promise<SyncResult> {
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

  return {
    animalsUpserted: animals.length,
    startedAt,
    finishedAt,
    durationMs:
      finishedAt.getTime() -
      startedAt.getTime(),
  };
}
