import { runFullSync } from "@/modules/sync/services/sync-orchestrator.service";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const result = await runFullSync();

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Erro ao executar sincronização.",
      },
      {
        status: 500,
      }
    );
  }
}