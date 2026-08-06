"use server";

import { syncImages } from "@/modules/sync/services/image-sync.service";

export async function syncImagesBatchAction(
  start: number,
  limit: number,
) {
  return syncImages({
    start,
    limit,
  });
}