"use server";

import { requireAdmin } from "@/modules/auth/services/admin-session.service";
import { runFullSync } from "@/modules/sync/services/sync-orchestrator.service";

export async function syncNow() {
  await requireAdmin();

  return runFullSync();
}
