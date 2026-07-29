import { google } from "googleapis";

import { getGoogleAuth } from "../google-drive/client";
import { SheetAnimal } from "./types";

function toBoolean(value?: string): boolean {
  return ["true", "sim", "1"].includes(
    value?.trim().toLowerCase() ?? ""
  );
}

export async function readAnimalsSheet(): Promise<SheetAnimal[]> {
  const auth =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await getGoogleAuth().getClient() as any;

  const sheets = google.sheets({
    version: "v4",
    auth,
  });
  const spreadsheetId =
    process.env.GOOGLE_SHEET_ID!;

  const { data } =
    await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Cachorros!A3:AA",
    });

  const rawRows = (data.values ?? []) as string[][];
  const rows = rawRows.filter((row) => (row[0] ?? "").toString().trim());

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

    castrado: toBoolean(row[10]),
    vacinado: toBoolean(row[11]),
    vermifugado: toBoolean(row[12]),

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

    assinouTermo: toBoolean(row[26]),
  }));
}