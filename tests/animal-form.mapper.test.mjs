import assert from "node:assert/strict";
import test from "node:test";

import {
  InvalidAnimalFormError,
  mapAnimalForm,
} from "../src/modules/animals/mappers/animal-form.mapper.ts";

function validForm() {
  const form = new FormData();
  form.set("id", "A-1");
  form.set("nome", "  Amora  ");
  form.set("status", "DISPONIVEL");
  form.set("images", JSON.stringify([
    { url: "https://example.com/1.jpg", principal: true },
    { url: "https://example.com/2.jpg", principal: true },
  ]));
  return form;
}

test("mapeia e normaliza o formulário administrativo", () => {
  const result = mapAnimalForm(validForm());

  assert.equal(result.animal.nome, "Amora");
  assert.equal(result.images[0].ordem, 0);
  assert.equal(result.images[0].principal, true);
  assert.equal(result.images[1].principal, false);
  assert.equal(result.images[1].animal_id, "A-1");
});

test("rejeita campos obrigatórios e imagens inseguras", () => {
  const missingName = validForm();
  missingName.delete("nome");
  assert.throws(() => mapAnimalForm(missingName), InvalidAnimalFormError);

  const unsafeImage = validForm();
  unsafeImage.set("images", JSON.stringify([{ url: "http://example.com/a.jpg" }]));
  assert.throws(() => mapAnimalForm(unsafeImage), /URL.*inválida/);
});
