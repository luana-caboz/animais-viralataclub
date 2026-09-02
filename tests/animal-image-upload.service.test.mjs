import assert from "node:assert/strict";
import test from "node:test";

import {
  AnimalImageUploadService,
  InvalidAnimalImageError,
} from "../src/modules/animals/services/animal-image-upload.service.ts";

test("valida e envia uma imagem usando a dependência injetada", async () => {
  const calls = [];
  const service = new AnimalImageUploadService(async (buffer, animalId, filename) => {
    calls.push({ size: buffer.length, animalId, filename });
    return { secureUrl: "https://cdn.example.com/image.png" };
  });
  const file = new File([new Uint8Array([1, 2, 3])], "foto.png", {
    type: "image/png",
  });

  assert.equal(await service.upload(file), "https://cdn.example.com/image.png");
  assert.equal(calls[0].size, 3);
  assert.equal(calls[0].animalId, "manual");
  assert.match(calls[0].filename, /\.png$/);
});

test("rejeita formatos de arquivo não permitidos", async () => {
  const service = new AnimalImageUploadService(async () => ({ secureUrl: "" }));
  const file = new File(["conteúdo"], "arquivo.svg", { type: "image/svg+xml" });

  await assert.rejects(() => service.upload(file), InvalidAnimalImageError);
});
