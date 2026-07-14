"use client";

import { uploadAnimalImage } from "@/lib/upload-image";
import { AnimalImage } from "@/types/animal-image";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  images: AnimalImage[];

  onChange: (
    images: AnimalImage[]
  ) => void;
};

export default function ImageUploader({
  images,
  onChange,
}: Props) {
  const [uploading, setUploading] =
    useState(false);

  const maxImages = 5;
  const maxSize = 5 * 1024 * 1024;

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  async function uploadImage(
    file: File,
    index: number
  ) {
    const url =
      await uploadAnimalImage(file);

    return {
      id: crypto.randomUUID(),
      animalId: "",
      url,
      legenda: "",
      ordem:
        images.length + index,
      principal:
        images.length === 0 &&
        index === 0,
    } satisfies AnimalImage;
  }

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(
      event.target.files ?? []
    );

    if (!files.length) {
      return;
    }

    if (
      images.length + files.length >
      maxImages
    ) {
      toast.error(
        `Você pode ter no máximo ${maxImages} fotos.`
      );

      return;
    }

    const invalidType =
      files.find(
        (file) =>
          !allowedTypes.includes(
            file.type
          )
      );

    if (invalidType) {
      toast.error(
        "Apenas PNG, JPG e WEBP são permitidos."
      );

      return;
    }

    const invalidSize =
      files.find(
        (file) =>
          file.size > maxSize
      );

    if (invalidSize) {
      toast.error(
        "Cada imagem pode ter no máximo 5MB."
      );

      return;
    }

    setUploading(true);

    try {
      const uploaded =
        await Promise.all(
          files.map(uploadImage)
        );

      onChange([
        ...images,
        ...uploaded,
      ]);

      toast.success(
        `${uploaded.length} foto(s) enviada(s)!`
      );
    } catch {
      toast.error(
        "Erro ao enviar imagens."
      );
    } finally {
      setUploading(false);
    }
  }

  const compact =
    images.length > 0;

  return (
    <>
      {compact ? (
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold text-slate-800">
              Fotos do animal
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {images.length} de{" "}
              {maxImages} fotos
            </p>
          </div>

          <label
            className="
              inline-flex
              cursor-pointer
              items-center
              justify-center
              rounded-xl
              bg-[#0f4fb6]
              px-5
              py-3
              font-medium
              text-white
              transition
              hover:bg-[#0d43a3]
              hover:shadow-lg
            "
          >
            {uploading
              ? "Enviando..."
              : "+ Adicionar fotos"}

            <input
              hidden
              multiple
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={
                handleUpload
              }
            />
          </label>
        </div>
      ) : (
        <label
          className="
            group
            block
            cursor-pointer
            rounded-3xl
            border-2
            border-dashed
            border-slate-300
            bg-slate-50
            p-8
            transition
            hover:border-[#0f4fb6]
            hover:bg-white
            md:p-12
          "
        >
          <div className="mx-auto flex max-w-xl flex-col items-center text-center">
            <div
              className="
                mb-6
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-white
                shadow-sm
              "
            >
              <span className="text-5xl">
                📷
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-800">
              {uploading
                ? "Enviando imagens..."
                : "Adicione fotos do animal"}
            </h3>

            <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
              Você pode selecionar
              várias fotos ao mesmo
              tempo para montar a
              galeria do animal.
            </p>

            <span
              className="
                mt-8
                rounded-xl
                bg-[#0f4fb6]
                px-6
                py-3
                font-semibold
                text-white
                transition
                group-hover:bg-[#0d43a3]
              "
            >
              {uploading
                ? "Enviando..."
                : "Selecionar Fotos"}
            </span>

            <div className="mt-8 space-y-1 text-sm text-slate-500">
              <p>
                PNG • JPG • WEBP
              </p>

              <p>
                Até 5 MB por imagem
              </p>

              <p>
                Máximo de{" "}
                {maxImages} fotos
              </p>
            </div>
          </div>

          <input
            hidden
            multiple
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleUpload}
          />
        </label>
      )}
    </>
  );
}