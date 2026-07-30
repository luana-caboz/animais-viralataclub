import { google } from "googleapis";

import { logger } from "@/shared/logger";
import { LogModules } from "@/shared/logger/modules";
import { getGoogleAuth } from "../google-drive/client";
import { SheetAnimal } from "./types";

export async function readAnimalsSheet(): Promise<SheetAnimal[]> {
  logger.info("Lendo dados da planilha de animais do Google Sheets", {
    module: LogModules.GoogleSheets,
  });

  try {
    const auth =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (await getGoogleAuth().getClient()) as any;

    const sheets = google.sheets({
      version: "v4",
      auth,
    });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID!;

    const { data } = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Cachorros!A3:AA",
    });

    const rawRows = (data.values ?? []) as string[][];
    const rows = rawRows.filter((row) => (row[0] ?? "").toString().trim());

    logger.info("Planilha carregada", {
      module: LogModules.GoogleSheets,
      animals: rows.length,
    });

    return rows.map((row) => ({
      id: row[0] ?? "",
      nome: row[1] ?? "",
      status: row[2] ?? "",

      sexo: row[3] ?? "",
      porte: row[4] ?? "",
      cores: row[5] ?? "",
      raca: row[6] ?? "",

      dataNascimento: row[7] ?? "",
      idadeEstimada: row[8] ?? "",

      localizacaoAtual: row[9] ?? "",

      castrado: row[10] ?? "",
      vacinado: row[11] ?? "",
      vermifugado: row[12] ?? "",

      condicoesSaude: row[13] ?? "",

      personalidade: row[14] ?? "",

      caes: row[15] ?? "",
      gatos: row[16] ?? "",
      criancas: row[17] ?? "",

      energia: row[18] ?? "",

      dataResgate: row[19] ?? "",

      historia: row[20] ?? "",

      quemAdotou: row[21] ?? "",

      dataAdocao: row[22] ?? "",

      comoFoiAdotado: row[23] ?? "",

      contato: row[24] ?? "",

      formulario: row[25] ?? "",

      assinouTermo: row[26] ?? "",
    }));
  } catch (error) {
    logger.error("Erro ao ler a planilha de animais do Google Sheets", {
      module: LogModules.GoogleSheets,
      error,
    });
    throw error;
  }
}
