import { createClient } from "@/lib/supabase-server";
import { mapInternalToDatabase } from "@/modules/animals/mappers/internal-animal-db.mapper";
import { InternalAnimal } from "@/types/animal";

export class SyncRepository {
  async upsertAnimal(payload: InternalAnimal) {
    const supabase = await createClient();

    const animal = mapInternalToDatabase(payload);

    const {error} = await supabase
      .from("animals")
      .upsert(animal, {
        onConflict: "id",
      });

      if (error) {
        console.error("Error upserting animal:", error);
        throw error;
      }
  }
}