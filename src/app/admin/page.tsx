import Link from "next/link";
import { getAnimals } from "@/lib/animals";

export default async function AdminPage() {
  const animals = await getAnimals();

  const disponiveis = animals.filter(
    (a) => a.status === "DISPONIVEL"
  ).length;

  const adotados = animals.filter(
    (a) => a.status === "ADOTADO"
  ).length;

  return (
    <main className="mx-auto max-w-7xl p-8">
      <div>
        <p className="text-[#f58220]">
          Painel Administrativo
        </p>

        <h1 className="mt-2 text-5xl font-extrabold text-[#0f4fb6]">
          Dashboard
        </h1>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow">
          <div className="text-4xl">🐶</div>

          <div className="mt-3 text-5xl font-bold">
            {animals.length}
          </div>

          <div>Total de animais</div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <div className="text-4xl">🏠</div>

          <div className="mt-3 text-5xl font-bold">
            {disponiveis}
          </div>

          <div>Disponíveis</div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <div className="text-4xl">❤️</div>

          <div className="mt-3 text-5xl font-bold">
            {adotados}
          </div>

          <div>Adotados</div>
        </div>
      </div>

      <div className="mt-10 flex gap-4">
        <Link
          href="/admin/animals"
          className="rounded-2xl bg-[#0f4fb6] px-6 py-4 text-white"
        >
          Gerenciar Animais
        </Link>

        <Link
          href="/admin/animals/novo"
          className="rounded-2xl bg-[#f58220] px-6 py-4 text-white"
        >
          Novo Animal
        </Link>
      </div>
    </main>
  );
}