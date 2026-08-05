import { logger } from "@/shared/logger";
import { LogModules } from "@/shared/logger/modules";
import { UploadApiResponse } from "cloudinary";
import { cloudinary } from "./client";
import { CloudinaryUpload } from "./types";

export async function uploadImage(
  buffer: Buffer,
  animalId: string,
  filename: string
): Promise<CloudinaryUpload> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "animals",
        public_id: `${animalId}/${filename.replace(/\.[^.]+$/, "")}`,
        overwrite: true,
        invalidate: true,
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          logger.error("Erro ao enviar imagem para o Cloudinary", {
            animalId,
            filename,
            error: error?.message ?? "Unknown error",
            module: LogModules.Cloudinary,
          });
          return reject(error);
        }

        resolve(mapUpload(result));
      }
    );

    logger.info("Enviando imagem para o Cloudinary", {
      animalId,
      filename,
      module: LogModules.Cloudinary,
    });

    stream.end(buffer);
  });
}

function mapUpload(
  upload: UploadApiResponse
): CloudinaryUpload {
  logger.info("Imagem enviada para o Cloudinary", {
    publicId: upload.public_id,
    module: LogModules.Cloudinary,
  });
  
  return {
    publicId: upload.public_id,
    secureUrl: upload.secure_url,
    width: upload.width,
    height: upload.height,
    format: upload.format,
  };
}