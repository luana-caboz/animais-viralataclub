import { syncAnimals } from "@/modules/sync/services/sync.service";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const result = await syncAnimals();

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