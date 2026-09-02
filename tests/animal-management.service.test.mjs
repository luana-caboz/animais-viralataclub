import assert from "node:assert/strict";
import test from "node:test";

import {
  AnimalAlreadyExistsError,
  AnimalManagementService,
} from "../src/modules/animals/services/animal-management.service.ts";

const animal = { id: "A1", nome: "Amora" };

function dependencies({ exists = false, imageFailure = false } = {}) {
  const calls = [];
  const animals = {
    async existsAnimal() { return exists; },
    async create(payload) { calls.push(["create", payload.id]); },
    async update(id) { calls.push(["update", id]); },
    async remove(id) { calls.push(["remove", id]); },
  };
  const images = {
    async replaceAnimalImages(id) {
      calls.push(["images", id]);
      if (imageFailure) throw new Error("upload failed");
    },
  };
  return { animals, images, calls };
}

test("impede IDs duplicados", async () => {
  const { animals, images } = dependencies({ exists: true });
  const service = new AnimalManagementService(animals, images);

  await assert.rejects(() => service.create(animal, []), AnimalAlreadyExistsError);
});

test("compensa a criação quando a persistência das imagens falha", async () => {
  const { animals, images, calls } = dependencies({ imageFailure: true });
  const service = new AnimalManagementService(animals, images);

  await assert.rejects(() => service.create(animal, [{ url: "https://x", animal_id: "A1" }]));
  assert.deepEqual(calls, [
    ["create", "A1"],
    ["images", "A1"],
    ["remove", "A1"],
  ]);
});

test("atualiza somente o ID recebido pelo caso de uso", async () => {
  const { animals, images, calls } = dependencies();
  const service = new AnimalManagementService(animals, images);

  await service.update("A1", { nome: "Amora" }, []);
  assert.deepEqual(calls, [["update", "A1"], ["images", "A1"]]);
});
