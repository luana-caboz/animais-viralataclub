import { mapInternalToDatabase } from "@/modules/animals/mappers/internal-animal-db.mapper";
import { supabaseAdmin } from "@/shared/lib/supabase/admin";
import { InternalAnimal } from "@/types/animal";

type AnimalToDelete = {
  id: string;
  nome: string;
};

export class SyncRepository {
  private supabase = supabaseAdmin;

  async upsertAnimal(payload: InternalAnimal): Promise<void> {
    const animal = mapInternalToDatabase(payload);

    const { error } = await this.supabase
      .from("animals")
      .upsert(animal, {
        onConflict: "id",
      });

    if (error) {
      throw error;
    }
  }

  // Upsert de todos os animais numa única requisição
  async upsertAnimals(payloads: InternalAnimal[]): Promise<void> {
    if (payloads.length === 0) {
      return;
    }

    // Campos `undefined` não podem ir no lote: o supabase-js os gravaria como
    // null, enquanto o upsert individual preserva o valor do banco. Por isso
    // remove esses campos e agrupa as linhas pelo mesmo conjunto de colunas.
    const groups = new Map<string, Record<string, unknown>[]>();

    for (const payload of payloads) {
      const row = Object.fromEntries(
        Object.entries(mapInternalToDatabase(payload)).filter(
          ([, value]) => value !== undefined,
        ),
      );
      const columns = Object.keys(row).sort().join(",");

      groups.set(columns, [...(groups.get(columns) ?? []), row]);
    }

    for (const rows of groups.values()) {
      const { error } = await this.supabase
        .from("animals")
        .upsert(rows, {
          onConflict: "id",
        });

      if (error) {
        throw error;
      }
    }
  }

  async getAnimalsToDelete(
    validAnimalIds: string[],
  ): Promise<AnimalToDelete[]> {
    const { data, error } = await this.supabase
      .from("animals")
      .select("id, nome");

    if (error) {
      throw error;
    }

    const validIds = new Set(validAnimalIds);

    return data.filter(
      (animal) => !validIds.has(animal.id),
    );
  }

  async deleteAnimal(id: string): Promise<void> {
    const { error } = await this.supabase
      .from("animals")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }
  }
}