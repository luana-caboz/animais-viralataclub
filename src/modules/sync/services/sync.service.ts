import { mapSyncToInternal } from "@/modules/animals/mappers/animal-sync.mapper";
import { mapSheetAnimal } from "@/modules/animals/mappers/sheet-animal.mapper";
import { readAnimalsSheet } from "@/shared/integrations/google-sheets/google-sheets.service";
import { logger } from "@/shared/logger";
import { LogModules } from "@/shared/logger/modules";
import { SyncRepository } from "../repositories/sync.repository";
import { SyncError, SyncResult } from "../types/sync.type";

export async function syncAnimals(): Promise<SyncResult> {
  logger.info("Iniciando sincronização de animais", {
    module: LogModules.SyncAnimals,
  });

  const startedAt = new Date();

  const sheet = await readAnimalsSheet();

  const animals = sheet
    .map(mapSheetAnimal)
    .map(mapSyncToInternal);

  const syncRepository = new SyncRepository();

  const errors: SyncError[] = [];
  let animalsUpserted = 0;
  let animalsRemoved = 0;

  for (const animal of animals) {
    try {
      await syncRepository.upsertAnimal(animal);
      animalsUpserted++;
    } catch (error) {
      logger.error("Erro ao sincronizar animal", {
        module: LogModules.SyncAnimals,
        animalId: animal.id,
        animalName: animal.nome,
        error,
      });

      errors.push({
        operation: "upsert",
        animalId: animal.id,
        animalName: animal.nome,
        error:
          error instanceof Error
            ? error.message
            : String(error),
      });
    }
  }

  try {
    const animalsToDelete =
      await syncRepository.getAnimalsToDelete(
        animals.map((animal) => animal.id)
      );

    for (const animal of animalsToDelete) {
      try {
        await syncRepository.deleteAnimal(animal.id);

        animalsRemoved++;

        logger.info(
          "Animal removido por não existir mais na planilha",
          {
            module: LogModules.SyncAnimals,
            animalId: animal.id,
            animalName: animal.nome,
          }
        );
      } catch (error) {
        logger.error(
          "Erro ao remover animal durante sincronização",
          {
            module: LogModules.SyncAnimals,
            animalId: animal.id,
            animalName: animal.nome,
            error,
          }
        );

        errors.push({
          operation: "delete",
          animalId: animal.id,
          animalName: animal.nome,
          error:
            error instanceof Error
              ? error.message
              : String(error),
        });
      }
    }
  } catch (error) {
    logger.error(
      "Erro ao buscar animais para remoção",
      {
        module: LogModules.SyncAnimals,
        error,
      }
    );

    errors.push({
      operation: "delete",
      animalId: "",
      animalName: "",
      error:
        error instanceof Error
          ? error.message
          : String(error),
    });
  }

  const finishedAt = new Date();

  logger.info("Animais sincronizados", {
    animalsRead: animals.length,
    animalsUpserted,
    animalsRemoved,
    errors: errors.length,
    module: LogModules.SyncAnimals,
  });

  return {
    animalsUpserted,
    animalsRemoved,
    errors,
    startedAt,
    finishedAt,
    durationMs:
      finishedAt.getTime() -
      startedAt.getTime(),
  };
}