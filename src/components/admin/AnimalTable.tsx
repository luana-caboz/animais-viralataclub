import Link from "next/link";

import { Animal } from "@/types/animal";

import { DeleteAnimalButton } from "@/components/admin/DeleteAnimalButton";

type Props = {
  animals: Animal[];
};

export function AnimalTable({
  animals,
}: Props) {
  return (
    <div className="grid gap-4">
      {animals.map((animal) => (
        <div
          key={animal.id}
          className="
            rounded-3xl
            bg-white
            p-5
            shadow
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">
                {animal.nome}
              </h3>

              <p className="text-slate-500">
                {animal.sexo} • Porte{" "}
                {animal.porte}
              </p>

              <p className="mt-2">
                {animal.status}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href={`/admin/animals/${animal.id}`}
                className="
                  font-medium
                  text-[#0f4fb6]
                  hover:underline
                "
              >
                Editar
              </Link>

              <DeleteAnimalButton
                id={animal.id}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}