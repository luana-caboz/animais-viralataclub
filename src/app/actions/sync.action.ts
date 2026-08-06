import { runFullSync } from "@/modules/sync/services/sync-orchestrator.service";

export async function syncNow() {
  return runFullSync();
}