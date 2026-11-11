import assert from "node:assert/strict";
import test from "node:test";

import { mapWithConcurrency } from "../src/shared/utils/concurrency.ts";

test("preserva a ordem e respeita o limite de concorrência", async () => {
  let running = 0;
  let maxRunning = 0;

  const results = await mapWithConcurrency([30, 10, 20, 5, 15], 2, async (ms, index) => {
    running++;
    maxRunning = Math.max(maxRunning, running);
    await new Promise((resolve) => setTimeout(resolve, ms));
    running--;
    return index;
  });

  assert.deepEqual(results, [0, 1, 2, 3, 4]);
  assert.equal(maxRunning, 2);
});

test("lida com lista vazia", async () => {
  assert.deepEqual(await mapWithConcurrency([], 3, async () => 1), []);
});
