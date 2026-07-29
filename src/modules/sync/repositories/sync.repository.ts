import { mapInternalToDatabase } from "@/modules/animals/mappers/internal-animal-db.mapper";
import { supabaseAdmin } from "@/shared/lib/supabase/admin";
import { InternalAnimal } from "@/types/animal";

export class SyncRepository {
  async upsertAnimal(payload: InternalAnimal) {
    const supabase = supabaseAdmin;

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