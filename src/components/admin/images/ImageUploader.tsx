"use client";

import { uploadAnimalImage } from "@/lib/upload-image";
import { AnimalImage } from "@/types/animal-image";
import { useState } from "react";

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

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(
      event.target.files ?? []
    );

    if (!files.length) {
      return;
    }

    setUploading(true);

    try {
      const uploaded =
        await Promise.all(
          files.map(
            async (
              file,
              index
            ) => {
              const url =
                await uploadAnimalImage(
                  file
                );

              return {
                id:
                  crypto.randomUUID(),

                animalId: "",

                url,

                legenda: "",

                ordem:
                  images.length +
                  index,

                principal:
                  images.length ===
                    0 &&
                  index === 0,
              } satisfies AnimalImage;
            }
          )
        );

      onChange([
        ...images,
        ...uploaded,
      ]);
    } finally {
      setUploading(false);
    }
  }

  return (
    <label
      className="
        flex
        cursor-pointer
        items-center
        justify-center
        rounded-2xl
        border-2
        border-dashed
        border-slate-300
        p-8
        transition
        hover:border-[#0f4fb6]
      "
    >
      <div className="text-center">
        <p className="text-lg font-semibold">
          {uploading
            ? "Enviando..."
            : "Selecionar Fotos"}
        </p>

        <p className="mt-2 text-sm text-slate-500">
          PNG, JPG ou WEBP
        </p>
      </div>

      <input
        hidden
        multiple
        type="file"
        accept="image/*"
        onChange={
          handleUpload
        }
      />
    </label>
  );
}