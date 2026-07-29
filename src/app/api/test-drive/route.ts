import { NextResponse } from "next/server";

import { syncAnimals } from "@/modules/sync/services/sync.service";
export async function POST() {
  const total = await syncAnimals();

  return NextResponse.json({
    success: true,
    animalsUpdated: total,
  });
}