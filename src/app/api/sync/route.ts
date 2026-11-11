import { runFullSync } from "@/modules/sync/services/sync-orchestrator.service";
import { runScheduledSync } from "@/modules/sync/services/scheduled-sync.service";
import { canRunSync } from "@/modules/auth/services/admin-session.service";
import { NextResponse } from "next/server";

// A sync agendada inclui as imagens em lotes e pode demorar
export const maxDuration = 300;

async function respond(sync: () => Promise<unknown>) {
  try {
    return NextResponse.json(await sync());
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

function unauthorized() {
  return NextResponse.json(
    { message: "Não autorizado." },
    { status: 401 },
  );
}

// Sincroniza apenas os dados da planilha (sessão de admin ou SYNC_API_SECRET)
export async function POST(request: Request) {
  if (!(await canRunSync(request))) {
    return unauthorized();
  }

  return respond(runFullSync);
}

// Chamado pelo Vercel Cron (agendamento em vercel.json): planilha + imagens alteradas,
// como o botão de sync do admin. Aceita apenas o CRON_SECRET, para que um GET com
// sessão de admin não dispare a sync.
export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;

  if (
    !cronSecret ||
    request.headers.get("authorization") !== `Bearer ${cronSecret}`
  ) {
    return unauthorized();
  }

  return respond(runScheduledSync);
}
