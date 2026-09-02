import { runFullSync } from "@/modules/sync/services/sync-orchestrator.service";
import { canRunSync } from "@/modules/auth/services/admin-session.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!(await canRunSync(request))) {
    return NextResponse.json(
      { message: "Não autorizado." },
      { status: 401 },
    );
  }

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
