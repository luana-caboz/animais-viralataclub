import Link from "next/link";
import { Animal } from "@/types/animal";
import { deleteAnimal } from "@/app/actions/animals";

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
                {animal.sexo} • Porte {animal.porte}
              </p>

              <p className="mt-2">
                {animal.status}
              </p>
            </div>

            <Link
              href={`/admin/animals/${animal.id}`}
              className="text-[#0f4fb6]"
            >
              Editar
            </Link>
          </div>

          <form
            action={deleteAnimal.bind(
              null,
              animal.id
            )}
          >
            <button
              className="
                text-red-500
                font-medium
              "
            >
              Excluir
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}