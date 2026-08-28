import assert from "node:assert/strict";
import test from "node:test";

import {
  formatarData,
  getIdFromSlug,
  slugifyAnimal,
} from "../src/modules/animals/utils/animal-slug.ts";

test("cria e lê slugs normalizados", () => {
  const slug = slugifyAnimal("João da Silva", "AbC-42");

  assert.equal(slug, "joao-da-silva-abc-42");
  assert.equal(getIdFromSlug(slug), "42");
});

test("formata datas em UTC e trata valores inválidos", () => {
  assert.match(formatarData("2024-03-01"), /março de 2024/);
  assert.equal(formatarData("data inválida"), "Data não informada");
  assert.equal(formatarData(null), "Data não informada");
});
