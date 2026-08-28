import { mapAnimalToDB } from "../mappers/animal.mapper";
import type { AnimalDB } from "../types/animal-db";
import type { InternalAnimal } from "../types/animal";

export interface AnimalImportRepository {
  existsAnimal(id: string): Promise<boolean>;
  insertImportedAnimal(payload: Partial<AnimalDB>): Promise<void>;
}

export type AnimalImportResult = {
  imported: number;
  ignored: number;
  failed: number;
};

export class AnimalImportService {
  constructor(private readonly repository: AnimalImportRepository) {}

  async import(rows: Partial<InternalAnimal>[]): Promise<AnimalImportResult> {
    const result: AnimalImportResult = {
      imported: 0,
      ignored: 0,
      failed: 0,
    };

    for (const row of rows) {
      if (!row.id || !row.nome) {
        result.ignored++;
        continue;
      }

      try {
        if (await this.repository.existsAnimal(row.id)) {
          result.ignored++;
          continue;
        }

        await this.repository.insertImportedAnimal(mapAnimalToDB(row));
        result.imported++;
      } catch {
        result.failed++;
      }
    }

    return result;
  }
}
