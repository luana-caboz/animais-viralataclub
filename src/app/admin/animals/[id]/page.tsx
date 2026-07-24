import AnimalForm from "@/modules/animals/components/AnimalForm";
import { getAnimalById } from "@/modules/animals/services/animal.service";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAnimalPage({
  params,
}: Props) {
  const { id } = await params;

  const animal = await getAnimalById(id);

  if (!animal) {
    return (
      <div className="p-8">
        Animal não encontrado
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-8 text-4xl font-bold">
        Editar {animal.nome}
      </h1>

      <AnimalForm animal={animal} />
    </main>
  );
}