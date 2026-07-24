import { NextResponse } from "next/server";

import { runSync } from "@/modules/sync/services/sync.service";

export async function POST() {
  const result = await runSync();

  return NextResponse.json(result);
}
