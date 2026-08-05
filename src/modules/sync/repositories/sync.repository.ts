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