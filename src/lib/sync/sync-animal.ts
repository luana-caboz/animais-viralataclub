import { mapSheetAnimal } from "@/lib/sync/mapper/sheet-animal.mapper";
import { SheetAnimal } from "@/types/sheet-animal";

export async function syncAnimal(
  sheetAnimal: SheetAnimal
) {
  const animal =
    mapSheetAnimal(
      sheetAnimal
    );

  /**
   * Sprint 2
   *
   * Upsert Animal
   * Buscar imagens
   * replaceAnimalImages()
   */

  return animal;
}