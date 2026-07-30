"use server";

import { runFullSync } from "@/modules/sync/services/sync-orchestrator.service";
import { revalidatePath } from "next/cache";

export async function syncNow() {
  const result = await runFullSync();

  revalidatePath("/admin");

  return result;
}