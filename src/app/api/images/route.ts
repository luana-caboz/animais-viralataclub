import { NextResponse } from "next/server";

import {
  AnimalImageUploadService,
  InvalidAnimalImageError,
} from "@/modules/animals/services/animal-image-upload.service";
import { getAdminUser } from "@/modules/auth/services/admin-session.service";
import { uploadImage } from "@/shared/integrations/cloudinary/service";
import { logger } from "@/shared/logger";

const uploadService = new AnimalImageUploadService(uploadImage);
const MAX_UPLOAD_BODY_SIZE = 5 * 1024 * 1024 + 64_000;

export async function POST(request: Request) {
  if (!(await getAdminUser())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (Number.isFinite(contentLength) && contentLength > MAX_UPLOAD_BODY_SIZE) {
    return NextResponse.json(
      { error: "A imagem deve ter no máximo 5 MB." },
      { status: 413 },
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "Arquivo de imagem não enviado." },
      { status: 400 },
    );
  }

  try {
    return NextResponse.json({ url: await uploadService.upload(file) });
  } catch (error) {
    if (error instanceof InvalidAnimalImageError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    logger.error("Erro no upload manual de imagem", { error });

    return NextResponse.json(
      { error: "Não foi possível enviar a imagem." },
      { status: 500 },
    );
  }
}
