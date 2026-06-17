import Image from "next/image";
import Link from "next/link";
import { getAnimals } from "@/services/animal.service";
import { getIdFromSlug, slugifyAnimal } from "@/lib/slug";

export default async function Home() {
  const animals = await getAnimals();

  return (
    <main className="min-h-screen bg-[#faf8f4]">
      {/* HEADER */}

      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Vira Lata Club"
              width={45}
              height={45}
              className="rounded-full md:h-[55px] md:w-[55px]"
            />

            <div>
              <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl md:text-4xl">
                <span className="text-[#0f4fb6]">VIRA LATA</span>{" "}
                <span className="text-[#f58220]">CLUB</span>
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}

      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-12 md:py-20 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h2
              className="
              text-5xl
              font-extrabold
              leading-none
              sm:text-6xl
              lg:text-7xl
            "
            >
              <span className="text-[#0f4fb6]">
                Adote amor.
              </span>

              <br />

              <span className="text-[#f58220]">
                Transforme vidas.
              </span>
            </h2>

            <p
              className="
              mt-6
              max-w-xl
              text-lg
              leading-relaxed
              text-gray-600
              md:text-xl
            "
            >
              Conheça nossos cães disponíveis para adoção
              e encontre seu novo melhor amigo.
            </p>

            <a
              href="#animais"
              className="
              mt-8
              w-full
              md:w-fit
              rounded-2xl
              bg-[#f58220]
              px-8
              py-4
              text-center
              text-lg
              font-bold
              text-white
              shadow-lg
              transition
              hover:scale-105
              "
            >
              🐾 Conheça nossos animais
            </a>
          </div>

          <div className="hidden items-center justify-center lg:flex">
            <div className="rounded-full bg-white p-6 shadow-2xl">
              <Image
                src="/logo.png"
                alt="Vira Lata Club"
                width={320}
                height={320}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* LISTAGEM */}

      <section
        id="animais"
        className="mx-auto max-w-7xl px-6 py-20"
      >
        <div className="mb-12 text-center">
          <div className="text-4xl">🐾</div>

          <h2 className="mt-4 text-5xl font-bold text-[#0f4fb6]">
            Nossos animais
          </h2>

          <p className="mt-4 text-xl text-gray-600">
            {animals.length} cães esperando por um lar cheio
            de amor.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {animals.map((animal) => (
            <Link
              key={animal.id}
              href={`/animais/${getIdFromSlug(
                slugifyAnimal(animal.nome, animal.id)
              )}`}
            >
              <div className="overflow-hidden rounded-3xl bg-white shadow-md transition-all hover:-translate-y-2 hover:shadow-2xl">
                <div className="relative aspect-square overflow-hidden">
                  {animal.fotoUrl?.trim() ? (
                    <>
                      <Image
                      src={animal.fotoUrl}
                      alt=""
                      fill
                      className="object-cover blur-2xl scale-125 opacity-25"
                    />

                      <Image
                        src={animal.fotoUrl}
                        alt={animal.nome}
                        fill
                        className="object-contain p-4"
                      />
                    </>
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center">
                      <span className="text-6xl">🐶</span>

                      <span className="mt-2 text-sm text-gray-500">
                        Foto em breve
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-xl font-bold text-[#0f4fb6]">
                    {animal.nome}
                  </h3>

                  <p className="mt-2 text-[#f58220]">
                    {animal.sexo} • Porte {animal.porte}
                  </p>

                  <p className="mt-2 text-gray-500">
                    {animal.idadeEstimada}
                  </p>

                  <div className="mt-4 font-semibold text-[#0f4fb6]">
                    Ver perfil →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}

      <footer className="bg-[#0f4fb6] py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="Vira Lata Club"
              width={60}
              height={60}
              className="rounded-full"
            />

            <div>
              <h3 className="font-bold">
                VIRA LATA CLUB
              </h3>

              <p className="text-sm opacity-80">
                Adoção responsável transforma vidas.
              </p>
            </div>
          </div>

          <p className="text-sm opacity-80">
            © 2025 Vira Lata Club
          </p>
        </div>
      </footer>

      <Link
        href="/login"
        className="
          fixed
          bottom-6
          right-6
          z-50
          rounded-full
          bg-white
          p-3
          shadow-lg
          transition
          hover:scale-105
        "
        title="Área Administrativa"
      >
        ⚙️
      </Link>
    </main>
  );
}