import { syncAnimal } from "./sync-animal";
import { loadSheetAnimals } from "./sync-sheet";

export async function syncAnimals() {
  const animals =
    await loadSheetAnimals();

  let processed = 0;

  for (const animal of animals) {
    await syncAnimal(animal);

    processed++;
  }

  return {
    processed,
  };
}