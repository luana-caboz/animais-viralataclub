import { getAnimals } from "@/modules/animals/services/animal.service";

import { AnimalFilters, AnimalTable, DashboardCards, ImportExportActions } from "@/modules/admin/components";

type Props = {
  searchParams: Promise<{
    status?: string;
  }>;
};

export default async function AdminPage({
  searchParams,
}: Props) {
  const { status } = await searchParams;

  const animals = await getAnimals();

  const filteredAnimals =
    status && status !== "TODOS"
      ? animals.filter(
          (animal) =>
            animal.status === status
        )
      : animals;

  const stats = {
    total: animals.length,

    disponiveis: animals.filter(
      (a) =>
        a.status === "DISPONIVEL"
    ).length,

    adotados: animals.filter(
      (a) =>
        a.status === "ADOTADO"
    ).length,
  };

  return (
    <main>
      <div className="mx-auto max-w-7xl p-8">
        <div className="mb-10">
          <p className="text-sm font-medium text-[#f58220]">
            Painel Administrativo
          </p>

          <h1 className="mt-2 text-5xl font-extrabold text-[#0f4fb6]">
            Bem-vinda 👋
          </h1>

          <p className="mt-3 text-lg text-slate-500">
            Gerencie animais, adoções e campanhas da ONG.
          </p>
        </div>

        <DashboardCards {...stats} />

        <div className="mt-8">
          <ImportExportActions />
        </div>

        <div className="mt-8">
          <AnimalFilters />
        </div>

        <div className="mt-8">
          <AnimalTable
            animals={filteredAnimals}
          />
        </div>
      </div>
    </main>
  );
}