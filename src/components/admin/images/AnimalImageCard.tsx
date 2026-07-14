"use client";

import { AnimalImage } from "@/types/animal-image";
import Image from "next/image";
import { toast } from "sonner";

type Props = {
  image: AnimalImage;

  onChange: (
    image: AnimalImage
  ) => void;

  onDelete: () => void;

  onSetPrincipal: () => void;

  isLoading?: boolean;

  dragHandle?: React.HTMLAttributes<HTMLButtonElement>;
};

export default function AnimalImageCard({
  image,
  onChange,
  onDelete,
  onSetPrincipal,
  isLoading = false,
  dragHandle
}: Props) {
  const handleDelete = () => {
    if (!confirm("Tem certeza que deseja excluir esta foto?")) {
      return;
    }
    onDelete();
    toast.success("Foto removida");
  };

  const handleSetPrincipal = () => {
    if (image.principal) {
      return;
    }
    onSetPrincipal();
    toast.success("Foto principal alterada");
  };
  return (
    <div
        className={`overflow-hidden rounded-2xl border bg-white shadow-sm ${
        image.principal ? "ring-4 ring-amber-400" : ""
        }`}
    >
        {/* HEADER */}

        <div className="flex items-center justify-between border-b px-4 py-3">
        <span className="font-semibold text-slate-700">
            Foto
        </span>

        <button
            type="button"
            {...dragHandle}
            className="
            cursor-grab
            rounded-lg
            p-2
            text-slate-400
            transition
            hover:bg-slate-100
            active:cursor-grabbing
            "
        >
            ☰
        </button>
        </div>

        {/* IMAGEM */}

        <div className="relative">
        <Image
            src={image.url}
            alt=""
            width={500}
            height={500}
            className="aspect-square w-full object-cover"
        />

        {image.principal && (
            <span
            className="
                absolute
                right-3
                top-3
                rounded-full
                bg-amber-400
                px-3
                py-1
                text-xs
                font-bold
                text-white
                shadow
            "
            >
            Principal
            </span>
        )}

        {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="space-y-3 text-center">
                <div className="flex justify-center gap-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                <span
                    className="h-1.5 w-1.5 animate-pulse rounded-full bg-white"
                    style={{
                    animationDelay: "0.2s",
                    }}
                />
                <span
                    className="h-1.5 w-1.5 animate-pulse rounded-full bg-white"
                    style={{
                    animationDelay: "0.4s",
                    }}
                />
                </div>

                <p className="text-sm font-semibold text-white">
                Enviando...
                </p>
            </div>
            </div>
        )}
        </div>

        {/* DADOS */}

        <div className="space-y-3 p-4">
        <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">
            Legenda
            </label>

            <input
            value={image.legenda ?? ""}
            onChange={(event) =>
                onChange({
                ...image,
                legenda: event.target.value,
                })
            }
            placeholder="Digite aqui (opcional)"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#0f4fb6] focus:outline-none focus:ring-1 focus:ring-[#0f4fb6]"
            />
        </div>

        <div className="flex gap-2">
            <button
            type="button"
            onClick={handleSetPrincipal}
            disabled={image.principal}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                image.principal
                ? "cursor-not-allowed bg-[#0f4fb6] text-white opacity-60"
                : "border border-[#0f4fb6] text-[#0f4fb6] hover:bg-[#0f4fb6] hover:text-white"
            }`}
            >
            {image.principal
                ? "⭐ Principal"
                : "Principal"}
            </button>

            <button
            type="button"
            onClick={handleDelete}
            className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
            >
            Excluir
            </button>
        </div>
        </div>
    </div>
    );
}