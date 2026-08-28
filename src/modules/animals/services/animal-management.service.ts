import type { AnimalImageInsert } from "../types/animal-image";
import type { AnimalMutationPayload } from "../types/animal-mutation";

export interface AnimalWriter {
  existsAnimal(id: string): Promise<boolean>;
  create(payload: AnimalMutationPayload): Promise<void>;
  update(id: string, payload: Omit<AnimalMutationPayload, "id">): Promise<void>;
  remove(id: string): Promise<void>;
}

export interface AnimalImageWriter {
  replaceAnimalImages(animalId: string, images: AnimalImageInsert[]): Promise<void>;
}

export class AnimalAlreadyExistsError extends Error {
  constructor(id: string) {
    super(`Já existe um animal com o ID ${id}.`);
    this.name = "AnimalAlreadyExistsError";
  }
}

export class AnimalManagementService {
  private readonly animals: AnimalWriter;
  private readonly images: AnimalImageWriter;

  constructor(
    animals: AnimalWriter,
    images: AnimalImageWriter,
  ) {
    this.animals = animals;
    this.images = images;
  }

  async create(payload: AnimalMutationPayload, images: AnimalImageInsert[]) {
    if (await this.animals.existsAnimal(payload.id)) {
      throw new AnimalAlreadyExistsError(payload.id);
    }

    await this.animals.create(payload);

    try {
      if (images.length > 0) {
        await this.images.replaceAnimalImages(payload.id, images);
      }
    } catch (error) {
      await this.animals.remove(payload.id).catch(() => undefined);
      throw error;
    }
  }

  async update(
    id: string,
    payload: Omit<AnimalMutationPayload, "id">,
    images: AnimalImageInsert[],
  ) {
    await this.animals.update(id, payload);
    await this.images.replaceAnimalImages(id, images);
  }

  async remove(id: string) {
    await this.animals.remove(id);
  }
}
