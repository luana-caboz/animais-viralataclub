import Image from "next/image";
import Link from "next/link";

import { Animal } from "@/types/animal";

type AnimalCardProps = {
  animal: Animal;
};

export default function AnimalCard({ animal }: AnimalCardProps) {
  const imageUrl = animal.fotos?.[0]?.url?.trim();

  return (
    <Link
      href={`/animais/${animal.id}`}
      className="block overflow-hidden rounded-3xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={animal.nome}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-center text-slate-500">
            <span className="text-6xl">🐶</span>
            <span className="mt-2 text-sm">Foto em breve</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-[#0f4fb6]">{animal.nome}</h3>
        <p className="mt-1 text-sm text-slate-600">{animal.sexo} • Porte {animal.porte}</p>
        <p className="mt-1 text-sm text-slate-500">{animal.idadeEstimada ?? "Idade não informada"}</p>
      </div>
    </Link>
  );
}
