"use server";

import { requireAdmin } from "@/modules/auth/services/admin-session.service";
import { syncImages } from "@/modules/sync/services/image-sync.service";

export async function syncImagesBatchAction(
  start: number,
  limit: number,
) {
  await requireAdmin();

  return syncImages({
    start,
    limit,
  });
}
