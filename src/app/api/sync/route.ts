import { NextResponse } from "next/server";

import { runSync } from "@/services/sync/sync.service";

export async function POST() {
  const result = await runSync();

  return NextResponse.json(result);
}
