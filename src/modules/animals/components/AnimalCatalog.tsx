"use client";

import { getIdFromSlug, slugifyAnimal } from "@/lib/slug";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type AnimalCatalogAnimal = {
  id: string;
  nome: string;
  sexo?: string | null;
  porte?: string | null;
  cores?: string | null;
  idadeEstimada?: string | null;
  fotos?: {
    url?: string | null;
  }[];
};

type AnimalCatalogProps = {
  animals: AnimalCatalogAnimal[];
};

function normalize(value?: string | null) {
  return (
    value
      ?.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toUpperCase() ?? ""
  );
}

function normalizeSexo(value?: string | null) {
  const normalized = normalize(value);

  if (normalized === "F" || normalized === "FEMEA") {
    return "FEMEA";
  }

  if (normalized === "M" || normalized === "MACHO") {
    return "MACHO";
  }

  return normalized;
}

function normalizePorte(value?: string | null) {
  return normalize(value);
}

const COR_HEX: Record<string, string> = {
  PRETO: "#1f1f1f",
  BRANCO: "#ffffff",
  CARAMELO: "#c68642",
  CREME: "#f1e0b8",
  MARROM: "#6b4423",
  DOURADO: "#d4a72c",
  CINZA: "#9ca3af",
};

function parseCores(value?: string | null) {
  return (value ?? "")
    .split(/[,;/]/)
    .map((cor) => cor.trim())
    .filter(Boolean);
}

export function AnimalCatalog({ animals }: AnimalCatalogProps) {
  const [search, setSearch] = useState("");
  const [sexo, setSexo] = useState("TODOS");
  const [porte, setPorte] = useState("TODOS");
  const [selectedCores, setSelectedCores] = useState<string[]>([]);

  // Lista de cores disponíveis, derivada dos próprios animais
  const availableCores = useMemo(() => {
    const map = new Map<string, string>();

    animals.forEach((animal) => {
      parseCores(animal.cores).forEach((cor) => {
        const key = normalize(cor);
        if (!map.has(key)) map.set(key, cor);
      });
    });

    return Array.from(map, ([value, label]) => ({ value, label })).sort((a, b) =>
      a.label.localeCompare(b.label, "pt-BR"),
    );
  }, [animals]);

  const hasActiveFilters =
    search.trim() !== "" ||
    sexo !== "TODOS" ||
    porte !== "TODOS" ||
    selectedCores.length > 0;

  function toggleCor(value: string) {
    setSelectedCores((current) =>
      current.includes(value)
        ? current.filter((cor) => cor !== value)
        : [...current, value],
    );
  }

  // Animais que passam por busca, sexo e porte (sem considerar as cores)
  const baseAnimals = useMemo(() => {
    const normalizedSearch = normalize(search);

    return animals.filter((animal) => {
      const matchesSearch =
        normalizedSearch === "" ||
        normalize(animal.nome).includes(normalizedSearch);

      const matchesSexo =
        sexo === "TODOS" || normalizeSexo(animal.sexo) === sexo;

      const matchesPorte =
        porte === "TODOS" || normalizePorte(animal.porte) === porte;

      return matchesSearch && matchesSexo && matchesPorte;
    });
  }, [animals, search, sexo, porte]);

  // O animal precisa ter todas as cores selecionadas
  const filteredAnimals = useMemo(
    () =>
      baseAnimals.filter((animal) => {
        const animalCores = parseCores(animal.cores).map(normalize);
        return selectedCores.every((cor) => animalCores.includes(cor));
      }),
    [baseAnimals, selectedCores],
  );

  // Quantos animais sobrariam ao marcar cada cor, dado o filtro atual
  const coreCounts = useMemo(() => {
    const counts = new Map<string, number>();

    filteredAnimals.forEach((animal) => {
      new Set(parseCores(animal.cores).map(normalize)).forEach((cor) => {
        counts.set(cor, (counts.get(cor) ?? 0) + 1);
      });
    });

    return counts;
  }, [filteredAnimals]);

  function clearFilters() {
    setSearch("");
    setSexo("TODOS");
    setPorte("TODOS");
    setSelectedCores([]);
  }

  return (
    <>
      {/* FILTROS */}
      <div className="mb-8 sm:mb-10">
        <div
          className="
    grid
    grid-cols-1
    gap-3
    md:grid-cols-2
    lg:grid-cols-[minmax(0,1.8fr)_minmax(150px,0.6fr)_minmax(150px,0.6fr)]
  "
        >
          {" "}
          {/* BUSCA */}
          <div className="relative md:col-span-2 lg:col-span-1">
            <div
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                z-10
                -translate-y-1/2
                text-[#0f4fb6]
              "
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <input
              id="animal-search"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Busque pelo nome"
              aria-label="Pesquisar animal pelo nome"
              className="
                h-12
                w-full
                rounded-[20px]
                border
                border-[#ece7df]
                bg-[#f8f7f4]
                pl-12
                pr-4
                text-[15px]
                text-gray-800
                outline-none
                transition-all
                placeholder:text-gray-400
                hover:border-[#e3ddd4]
                focus:border-[#0f4fb6]/25
                focus:bg-white
                focus:ring-2
                focus:ring-[#0f4fb6]/5
              "
            />
          </div>
          {/* SEXO */}
          <div className="relative">
            <span
              className="
                pointer-events-none
                absolute
                left-4
                top-2
                z-10
                text-[10px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-gray-600
              "
            >
              Sexo
            </span>

            <select
              id="animal-sexo"
              value={sexo}
              onChange={(event) => setSexo(event.target.value)}
              aria-label="Filtrar por sexo"
              className="
                h-12
                w-full
                cursor-pointer
                appearance-auto
                rounded-[20px]
                border
                border-[#ece7df]
                bg-[#f8f7f4]
                px-4
                pb-1
                pt-5
                text-[15px]
                font-medium
                text-gray-700
                outline-none
                transition-all
                hover:border-[#e3ddd4]
                focus:border-[#0f4fb6]/25
                focus:bg-white
                focus:ring-2
                focus:ring-[#0f4fb6]/5
              "
            >
              <option value="TODOS">Todos</option>
              <option value="MACHO">Macho</option>
              <option value="FEMEA">Fêmea</option>
            </select>
          </div>
          {/* PORTE */}
          <div className="relative">
            <span
              className="
                pointer-events-none
                absolute
                left-4
                top-2
                z-10
                text-[10px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-gray-600
              "
            >
              Porte
            </span>

            <select
              id="animal-porte"
              value={porte}
              onChange={(event) => setPorte(event.target.value)}
              aria-label="Filtrar por porte"
              className="
                h-12
                w-full
                cursor-pointer
                appearance-auto
                rounded-[20px]
                border
                border-[#ece7df]
                bg-[#f8f7f4]
                px-4
                pb-1
                pt-5
                text-[15px]
                font-medium
                text-gray-700
                outline-none
                transition-all
                hover:border-[#e3ddd4]
                focus:border-[#f58220]/25
                focus:bg-white
                focus:ring-2
                focus:ring-[#f58220]/5
              "
            >
              <option value="TODOS">Todos</option>
              <option value="MINI">Mini</option>
              <option value="P">P</option>
              <option value="M">M</option>
              <option value="G">G</option>
              <option value="XG">XG</option>
              <option value="FILHOTE">Filhote</option>
            </select>
          </div>
        </div>

        {/* CORES */}
        {availableCores.length > 0 && (
          <fieldset className="mt-5">
            <legend className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-600">
              Cores
            </legend>

            <div className="flex flex-wrap gap-2">
              {availableCores.map((cor) => {
                const checked = selectedCores.includes(cor.value);
                const count = coreCounts.get(cor.value) ?? 0;
                const disabled = !checked && count === 0;
                const hex = COR_HEX[cor.value] ?? "#d1d5db";
                const isLight = ["BRANCO", "CREME", "DOURADO"].includes(
                  cor.value,
                );

                return (
                  <button
                    key={cor.value}
                    type="button"
                    role="checkbox"
                    aria-checked={checked}
                    disabled={disabled}
                    onClick={() => toggleCor(cor.value)}
                    className={`inline-flex select-none items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4fb6]/40 ${
                      checked
                        ? "border-[#0f4fb6] bg-[#0f4fb6] text-white"
                        : disabled
                          ? "cursor-not-allowed border-gray-200 bg-white text-gray-400 opacity-50"
                          : "cursor-pointer border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-black/15"
                      style={{ backgroundColor: hex }}
                    >
                      {checked && (
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={isLight ? "#0f4fb6" : "#ffffff"}
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                      )}
                    </span>
                    {cor.label}
                    <span
                      className={`text-xs ${checked ? "text-white/80" : "text-gray-400"}`}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {/* RESULTADO */}
        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-[#f58220]" />

              <p className="text-sm text-gray-500">
                <span className="font-bold text-[#0f4fb6]">
                  {filteredAnimals.length}
                </span>{" "}
                {filteredAnimals.length === 1
                  ? "animal encontrado"
                  : "animais encontrados"}
              </p>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="
        w-fit
        rounded-full
        px-3
        py-1.5
        text-sm
        font-semibold
        text-[#0f4fb6]
        transition
        hover:bg-[#eef4ff]
      "
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>

      {/* SEM RESULTADOS */}
      {filteredAnimals.length === 0 ? (
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            rounded-[28px]
            border
            border-[#ece7df]
            bg-white/60
            px-6
            py-16
            text-center
          "
        >
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-[#fff1e5]
              text-3xl
            "
          >
            🐾
          </div>

          <h3 className="mt-5 text-2xl font-bold text-[#0f4fb6]">
            Nenhum animal encontrado
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-[15px] leading-6 text-gray-500">
            Não encontramos nenhum cão com esses filtros. Tente outra busca ou
            limpe os filtros para conhecer todos os disponíveis.
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="
                mt-6
                rounded-full
                bg-[#f58220]
                px-6
                py-3
                text-sm
                font-bold
                text-white
                shadow-sm
                transition-all
                hover:-translate-y-0.5
                hover:shadow-md
              "
            >
              Ver todos os animais
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredAnimals.map((animal) => {
            const fotoPrincipal = animal.fotos?.[0]?.url?.trim();

            return (
              <Link
                key={animal.id}
                href={`/animais/${getIdFromSlug(
                  slugifyAnimal(animal.nome, animal.id),
                )}`}
                className="group"
              >
                <article
                  className="
                    flex
                    h-full
                    flex-col
                    overflow-hidden
                    rounded-[28px]
                    bg-white
                    shadow-[0_8px_30px_rgba(15,79,182,0.08)]
                    transition-all
                    duration-300
                    group-hover:-translate-y-1.5
                    group-hover:shadow-[0_16px_40px_rgba(15,79,182,0.13)]
                  "
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#cfe7f7]">
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
                          group-hover:scale-[1.025]
                        "
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center">
                        <span className="text-6xl">🐶</span>
                        <span className="mt-2 text-sm text-gray-500">
                          Foto em breve
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-[22px] font-extrabold text-[#0f4fb6]">
                      {animal.nome}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {animal.sexo && (
                        <span
                          className="
                            rounded-full
                            bg-[#eef4ff]
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            text-[#0f4fb6]
                          "
                        >
                          {animal.sexo}
                        </span>
                      )}

                      {animal.porte && (
                        <span
                          className="
                            rounded-full
                            bg-[#fff1e5]
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            text-[#d9680d]
                          "
                        >
                          Porte {animal.porte}
                        </span>
                      )}
                    </div>

                    {animal.idadeEstimada && (
                      <p className="mt-3 text-sm text-gray-500">
                        {animal.idadeEstimada}
                      </p>
                    )}

                    <div
                      className="
                        mt-auto
                        flex
                        items-center
                        gap-1
                        pt-5
                        text-sm
                        font-bold
                        text-[#0f4fb6]
                      "
                    >
                      Conhecer {animal.nome}
                      <span
                        className="
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      >
                        →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
