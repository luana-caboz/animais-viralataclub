import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

import { getAnimals } from "@/lib/animals";
import { supabase } from "@/lib/supabase";
import { Animal } from "@/types/animal";
import { mapAnimalToDB } from "@/mappers/animal.mapper";

export async function GET() {
  const animals = await getAnimals();

  const worksheet =
    XLSX.utils.json_to_sheet(animals);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Animais"
  );

  const buffer = XLSX.write(
    workbook,
    {
      type: "buffer",
      bookType: "xlsx",
    }
  );

  return new NextResponse(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

      "Content-Disposition":
        'attachment; filename="animais.xlsx"',
    },
  });
}

export async function POST(
  request: Request
) {
  const formData =
    await request.formData();

  const file =
    formData.get("file") as File;

  const bytes =
    await file.arrayBuffer();

  const workbook =
    XLSX.read(bytes);

  const sheet =
    workbook.Sheets[
      workbook.SheetNames[0]
    ];

  const animals =
    XLSX.utils.sheet_to_json<Animal>(sheet);

  for (const row of animals) {
    await supabase
      .from("animals")
      .upsert(mapAnimalToDB(row as Partial<Animal>));
  }

  return NextResponse.json({
    success: true,
  });
}