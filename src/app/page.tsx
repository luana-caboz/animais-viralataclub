import { getIdFromSlug, slugifyAnimal } from "@/lib/slug";
import { getAnimals } from "@/modules/animals/services/animal.service";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const animals = await getAnimals();

  return (
    <main className="min-h-screen bg-[#faf8f4]">
      {/* HEADER */}

      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:py-6 md:px-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Vira Lata Club"
              width={45}
              height={45}
              className="rounded-full md:h-[55px] md:w-[55px]"
            />

            <div>
              <h1 className="text-[18px] font-extrabold tracking-tight sm:text-2xl md:text-4xl">
                <span className="text-[#0f4fb6]">VIRA LATA</span>{" "}
                <span className="text-[#f58220]">CLUB</span>
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}

<section className="relative overflow-hidden">
  <div
    className="
      mx-auto
      grid
      max-w-7xl
      gap-8
      px-5
      py-8
      sm:px-6
      sm:py-12
      md:py-16
      lg:grid-cols-2
      lg:gap-12
      lg:py-20
    "
  >
    <div className="flex flex-col justify-center">
      <h2
        className="
          text-[42px]
          font-extrabold
          leading-[0.98]
          tracking-[-0.03em]
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
          mt-5
          max-w-xl
          text-[17px]
          leading-7
          text-gray-600
          sm:mt-6
          sm:text-lg
          md:text-xl
        "
      >
        Conheça nossos cães disponíveis para adoção e encontre seu novo
        melhor amigo.
      </p>

      <a
        href="#animais"
        className="
          mt-7
          w-full
          rounded-2xl
          bg-[#f58220]
          px-5
          py-3.5
          text-center
          text-base
          font-bold
          text-white
          shadow-lg
          transition
          hover:scale-105
          sm:px-8
          sm:py-4
          sm:text-lg
          md:w-fit
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
  className="
    mx-auto
    max-w-7xl
    px-5
    pb-16
    pt-12
    sm:px-6
    sm:py-16
    md:py-20
  "
>        
<div className="mb-8 text-center sm:mb-12">
  <div className="text-3xl sm:text-4xl">
    🐾
  </div>

  <h2
    className="
      mt-3
      text-4xl
      font-bold
      leading-tight
      text-[#0f4fb6]
      sm:mt-4
      sm:text-5xl
    "
  >
    Nossos animais
  </h2>

  <p
    className="
      mx-auto
      mt-3
      max-w-md
      text-base
      leading-6
      text-gray-600
      sm:mt-4
      sm:text-xl
    "
  >
    {animals.length} cães esperando por um lar cheio de amor.
  </p>
</div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {animals.map((animal) => {
            const fotoPrincipal = animal.fotos?.[0]?.url?.trim();

            return (
              <Link
                key={animal.id}
                href={`/animais/${getIdFromSlug(
                  slugifyAnimal(animal.nome, animal.id),
                )}`}
                className="group"
              >
                <div
                  className="
            flex
            h-full
            flex-col
            overflow-hidden
            rounded-3xl
            bg-white
            shadow-md
            transition-all
            duration-300
            group-hover:-translate-y-2
            group-hover:shadow-2xl
          "
                >
                  {/* FOTO */}
                  <div
                    className="
              relative
              aspect-[4/5]
              overflow-hidden
              bg-[#cfe7f7]
            "
                  >
                    {fotoPrincipal ? (
                      <Image
                        src={fotoPrincipal}
                        alt={animal.nome}
                        fill
                        sizes="
                  (max-width: 640px) 100vw,
                  (max-width: 1024px) 50vw,
                  25vw
                "
                        className="
                  object-cover
                  object-[center_42%]
                  transition-transform
                  duration-500
                  group-hover:scale-[1.02]
                "
                      />
                    ) : (
                      <div
                        className="
                  flex
                  h-full
                  w-full
                  flex-col
                  items-center
                  justify-center
                "
                      >
                        <span className="text-6xl">🐶</span>

                        <span className="mt-2 text-sm text-gray-500">
                          Foto em breve
                        </span>
                      </div>
                    )}
                  </div>

                  {/* INFORMAÇÕES */}
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-xl font-bold text-[#0f4fb6]">
                      {animal.nome}
                    </h3>

                    <p className="mt-2 text-[#f58220]">
                      {animal.sexo} • Porte {animal.porte}
                    </p>

                    <p className="mt-2 text-gray-500">{animal.idadeEstimada}</p>

                    <div className="mt-auto pt-4 font-semibold text-[#0f4fb6]">
                      Ver perfil →
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
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
              <h3 className="font-bold">VIRA LATA CLUB</h3>

              <p className="text-sm opacity-80">
                Adoção responsável transforma vidas.
              </p>
            </div>
          </div>

          <p className="text-sm opacity-80">© 2025 Vira Lata Club</p>
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
