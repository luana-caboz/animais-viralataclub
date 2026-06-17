import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

import { supabase } from "@/lib/supabase";
import { mapAnimalToDB } from "@/mappers/animal.mapper";
import { Animal } from "@/types/animal";

export async function POST(
  request: Request
) {
  const formData =
    await request.formData();

  const file =
    formData.get("file") as File;

  if (!file) {
    return NextResponse.json(
      { error: "Arquivo não enviado" },
      { status: 400 }
    );
  }

  const bytes =
    await file.arrayBuffer();

  const workbook =
    XLSX.read(bytes);

  const sheet =
    workbook.Sheets[
      workbook.SheetNames[0]
    ];

  const animals =
    XLSX.utils.sheet_to_json<Animal>(
      sheet
    );

  let imported = 0;
  let ignored = 0;

  for (const animal of animals) {
  const payload =
    mapAnimalToDB(animal);

  const { data: exists } =
    await supabase
      .from("animals")
      .select("id")
      .eq("id", payload.id)
      .maybeSingle();

  if (exists) {
    ignored++;
    continue;
  }

  const result =
    await supabase
      .from("animals")
      .insert(payload)
      .select();

  console.log(result);

  if (result.error) {
    console.error(result.error);
    continue;
  }

  imported++;
}

  return NextResponse.json({
    success: true,
    imported,
    ignored,
  });
}