import {
  downloadImage,
  listAnimalsFromDrive,
} from "@/shared/integrations/google-drive/drive.service";

import { uploadImage } from "@/shared/integrations/cloudinary/service";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await testCloudinary();

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro desconhecido",
      },
      {
        status: 500,
      }
    );
  }
}

export async function testCloudinary() {
  const animals =
    await listAnimalsFromDrive();

  const firstAnimal = animals[0];

  if (!firstAnimal) {
    throw new Error(
      "Nenhum animal encontrado."
    );
  }

  const firstImage = firstAnimal.images[0];

if (!firstImage) {
  throw new Error("Animal sem imagens.");
}

if (!firstImage.id) {
  throw new Error("Imagem sem id.");
}

if (!firstImage.name) {
  throw new Error("Imagem sem nome.");
}

const buffer = await downloadImage(firstImage.id);

const uploaded = await uploadImage(
  buffer,
  firstAnimal.animalId,
  firstImage.name
);

  console.log(uploaded);

  return uploaded;
}