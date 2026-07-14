"use client";

import { AnimalImage } from "@/types/animal-image";
import Image from "next/image";

type Props = {
  image: AnimalImage;

  onChange: (
    image: AnimalImage
  ) => void;

  onDelete: () => void;

  onSetPrincipal: () => void;
};

export default function AnimalImageCard({
  image,
  onChange,
  onDelete,
  onSetPrincipal,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <Image
        src={image.url}
        alt=""
        width={500}
        height={500}
        className="aspect-square w-full object-cover"
      />

      <div className="space-y-4 p-4">
        <button
          type="button"
          onClick={
            onSetPrincipal
          }
          className={`w-full rounded-xl px-4 py-2 font-medium transition ${
            image.principal
              ? "bg-[#0f4fb6] text-white"
              : "border"
          }`}
        >
          {image.principal
            ? "⭐ Principal"
            : "☆ Tornar principal"}
        </button>

        <input
          value={
            image.legenda ??
            ""
          }
          onChange={(
            event
          ) =>
            onChange({
              ...image,
              legenda:
                event.target
                  .value,
            })
          }
          placeholder="Legenda (opcional)"
          className="w-full rounded-xl border p-3"
        />

        <button
          type="button"
          onClick={onDelete}
          className="w-full rounded-xl border border-red-200 py-3 text-red-500 transition hover:bg-red-50"
        >
          Excluir foto
        </button>
      </div>
    </div>
  );
}