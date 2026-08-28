import assert from "node:assert/strict";
import test from "node:test";

import { hasImagesChanged } from "../src/modules/sync/utils/image-sync.util.ts";

const drive = [{ id: "drive-1", name: "foto.jpg", mimeType: "image/jpeg", md5Checksum: "abc" }];
const database = [{ drive_file_id: "drive-1", drive_md5: "abc", ordem: 0, principal: true }];

test("detecta quando imagens do Drive permanecem iguais", () => {
  assert.equal(hasImagesChanged(drive, database), false);
});

test("detecta conteúdo, ordem ou quantidade alterados", () => {
  assert.equal(hasImagesChanged([{ ...drive[0], md5Checksum: "new" }], database), true);
  assert.equal(hasImagesChanged(drive, [{ ...database[0], ordem: 1 }]), true);
  assert.equal(hasImagesChanged([], database), true);
});
