import Image from "next/image";
import Link from "next/link";
import { getAnimalBySlug } from "@/lib/animals";
import { formatarData } from "@/lib/slug";
import {
  ClipboardList,
  HeartPulse,
  PawPrint,
  Users,
} from "lucide-react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function AnimalPage({
  params,
}: Props) {
  const { slug } = await params;
  const animal = await getAnimalBySlug(slug);

  if (!animal) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf8f4]">
        <h1 className="text-2xl font-bold">
          Animal não encontrado 😢
        </h1>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#faf8f4]">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-100px] top-[100px] h-72 w-72 rounded-full bg-blue-100 blur-3xl opacity-40" />

        <div className="absolute right-[-100px] bottom-[200px] h-72 w-72 rounded-full bg-orange-100 blur-3xl opacity-40" />
      </div>
      {/* HEADER */}

      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-6 pt-4">
          <Link
            href="/"
            className="
              inline-flex
              items-center
              gap-2
              text-[#0f4fb6]
              font-medium
              hover:underline
            "
          >
            ← Voltar
          </Link>
        </div>

        <div className="mx-auto flex max-w-6xl items-center px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-4"
          >
            <Image
              src="/logo.png"
              alt="Vira Lata Club"
              width={55}
              height={55}
              className="rounded-full"
            />

            <h1 className="text-2xl font-extrabold">
              <span className="text-[#0f4fb6]">
                VIRA LATA
              </span>{" "}
              <span className="text-[#f58220]">
                CLUB
              </span>
            </h1>
          </Link>
        </div>
      </header>

      {/* CONTEÚDO */}

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[40%_60%]">
          {/* FOTO */}

          <div>
            <div className="relative h-[520px] overflow-hidden rounded-[32px] bg-gradient-to-br from-[#edf4ff] to-[#fff3e8] shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              <div className="absolute left-5 top-5 z-20 rounded-full bg-[#f58220] px-5 py-2 font-semibold text-white shadow-lg">
                🏠 Procuro uma família
              </div>

              {animal.fotoUrl?.trim() ? (
                <>
                  {/* fundo desfocado */}
                  <Image
                    src={animal.fotoUrl}
                    alt=""
                    fill
                    className="object-cover blur-2xl scale-125 opacity-25"
                  />

                  {/* foto principal */}
                  <Image
                    src={animal.fotoUrl}
                    alt={animal.nome}
                    fill
                    className="object-contain p-6"
                  />
                </>
              ) : (
                <div className="flex h-full items-center justify-center text-8xl">
                  🐶
                </div>
              )}
            </div>
          </div>

          {/* INFO */}

          <div className="flex flex-col">
            <h1 className="text-5xl font-extrabold text-[#0f4fb6]">
              {animal.nome}
            </h1>

            <div className="mt-4 flex flex-wrap gap-3">
              <span className="rounded-full bg-blue-100 px-4 py-2 font-medium text-[#0f4fb6]">
                {animal.sexo}
              </span>

              <span className="rounded-full bg-orange-100 px-4 py-2 font-medium text-[#f58220]">
                Porte {animal.porte}
              </span>

              <span className="rounded-full bg-green-100 px-4 py-2 font-medium text-green-700">
                {animal.idadeEstimada}
              </span>
            </div>

            <div className="mt-6 rounded-3xl bg-gradient-to-r from-blue-50 to-orange-50 p-5">
              <p className="text-lg text-slate-700">
                🏡 Procurando uma família desde{" "}
                <strong>{formatarData(animal.dataResgate)}</strong>
              </p>
            </div>

            {/* HISTÓRIA */}

            <div className="mt-8 rounded-[32px] border border-slate-100 bg-white p-8 shadow-lg">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-[#0f4fb6]">
                <PawPrint size={28} />
                Conheça o {animal.nome}
              </h2>

              <p className="mt-5 text-[18px] leading-8 text-slate-600">
                {animal.historia ||
                  "Ainda estamos preparando a história deste animal."}
              </p>
            </div>
          </div>
        </div>

        {/* DETALHES */}

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* INFORMAÇÕES */}

          <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-lg">
            <h3 className="mb-5 flex items-center gap-3 text-2xl font-bold text-[#0f4fb6]">
              <ClipboardList size={24} />
              Informações
            </h3>

            <div className="space-y-4 text-lg">
              <p>
                <strong>Raça:</strong> {animal.raca}
              </p>

              <p>
                <strong>Cor:</strong> {animal.cores}
              </p>

              <p>
                <strong>Idade:</strong> {animal.idadeEstimada}
              </p>
            </div>
          </div>

          {/* SAÚDE */}

          <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-lg">
            <h3 className="mb-5 flex items-center gap-3 text-2xl font-bold text-[#0f4fb6]">
              <HeartPulse size={24} />
              Saúde
            </h3>

            <div className="space-y-4 text-lg">
              <p>{animal.castrado ? "✅ Castrado" : "❌ Não castrado"}</p>

              <p>{animal.vacinado ? "✅ Vacinado" : "❌ Não vacinado"}</p>

              <p>{animal.vermifugado ? "✅ Vermifugado" : "❌ Não vermifugado"}</p>

              <p>
                <strong>Condição:</strong> {animal.condicoesSaude}
              </p>
            </div>
          </div>

          {/* COMPORTAMENTO */}

          <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-lg">
            <h3 className="mb-5 flex items-center gap-3 text-2xl font-bold text-[#0f4fb6]">
              🐶 Personalidade
            </h3>

            <div className="mb-6 flex flex-wrap gap-3">
              {animal.personalidade
                ?.split(",")
                ?.map((item) => (
                  <span
                    key={item}
                    className="
                      rounded-full
                      bg-[#edf4ff]
                      px-4
                      py-2
                      font-medium
                      text-[#0f4fb6]
                    "
                  >
                    {item.trim()}
                  </span>
                ))}
            </div>

            <p className="text-lg">
              <strong>Energia:</strong>{" "}
              {animal.energia}
            </p>
          </div>

          {/* SOCIABILIDADE */}

          <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-lg">
            <h3 className="mb-5 flex items-center gap-3 text-2xl font-bold text-[#0f4fb6]">
              <Users size={24} />
              Sociabilidade
            </h3>

            <div className="space-y-4 text-lg">
              <p>🐶 Cães: {animal.caes}</p>

              <p>🐱 Gatos: {animal.gatos}</p>

              <p>👶 Crianças: {animal.criancas}</p>
            </div>
          </div>
        </div>
      </div>
     <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdSci6Hras_nxwBDkXJ2RIhNIQKSnLREJbZIzEpBLjIHdtqpg/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex
            items-center
            gap-2
            rounded-full
            bg-[#f58220]
            px-6
            py-3
            text-base
            font-semibold
            text-white
            shadow-xl
            transition-all
            hover:scale-105
          "
        >
          🐾 Adotar {animal.nome}
        </a>
      </div>
    </main>
  );
}