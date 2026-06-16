"use client";

import { Animal } from "@/types/animal";
import {
  createAnimal,
  updateAnimal,
} from "@/app/actions/animals";

type Props = {
  animal?: Partial<Animal>;
};

export default function AnimalForm({
  animal,
}: Props) {
  return (
    <form action={
    animal?.id
      ? updateAnimal.bind(
          null,
          animal.id
        )
      : createAnimal
  } className="space-y-8">
      {/* IDENTIFICAÇÃO */}

      <section className="rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-6 text-2xl font-bold">
          Identificação
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">
              ID
            </label>

            <input
              name="id"
              defaultValue={animal?.id}
              placeholder="C0061"
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Nome
            </label>

            <input
              name="nome"
              defaultValue={animal?.nome}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Status
            </label>

            <select
              name="status"
              defaultValue={animal?.status}
              className="w-full rounded-xl border p-3"
            >
              <option value="DISPONIVEL">
                Disponível
              </option>

              <option value="ADOTADO">
                Adotado
              </option>

              <option value="EM_TRATAMENTO">
                Em tratamento
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Sexo
            </label>

            <select
              name="sexo"
              defaultValue={animal?.sexo}
              className="w-full rounded-xl border p-3"
            >
              <option>Macho</option>
              <option>Fêmea</option>
            </select>
          </div>
        </div>
      </section>

      {/* CARACTERÍSTICAS */}

      <section className="rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-6 text-2xl font-bold">
          Características
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">
              Porte
            </label>

            <select
              name="porte"
              defaultValue={animal?.porte}
              className="w-full rounded-xl border p-3"
            >
              <option>P</option>
              <option>M</option>
              <option>G</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Raça
            </label>

            <input
              name="raca"
              defaultValue={animal?.raca}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Cor
            </label>

            <input
              name="cores"
              defaultValue={animal?.cores}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Energia
            </label>

            <select
              name="energia"
              defaultValue={animal?.energia}
              className="w-full rounded-xl border p-3"
            >
              <option>Baixo</option>
              <option>Médio</option>
              <option>Alto</option>
            </select>
          </div>
        </div>
      </section>

      {/* DATAS */}

      <section className="rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-6 text-2xl font-bold">
          Datas
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">
              Data de nascimento
            </label>

            <input
              type="date"
              name="dataNascimento"
              defaultValue={animal?.dataNascimento}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Data de resgate
            </label>

            <input
              type="date"
              name="dataResgate"
              defaultValue={animal?.dataResgate}
              className="w-full rounded-xl border p-3"
            />
          </div>
        </div>
      </section>

      {/* SAÚDE */}

      <section className="rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-6 text-2xl font-bold">
          Saúde
        </h2>

        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="castrado"
              defaultChecked={animal?.castrado}
            />
            Castrado
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="vacinado"
              defaultChecked={animal?.vacinado}
            />
            Vacinado
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="vermifugado"
              defaultChecked={animal?.vermifugado}
            />
            Vermifugado
          </label>

          <div>
            <label className="mb-2 block font-medium">
              Condições de saúde
            </label>

            <input
              name="condicoesSaude"
              defaultValue={animal?.condicoesSaude}
              className="w-full rounded-xl border p-3"
            />
          </div>
        </div>
      </section>

      {/* SOCIABILIDADE */}

      <section className="rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-6 text-2xl font-bold">
          Sociabilidade
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block font-medium">
              Cães
            </label>

            <input
              name="caes"
              defaultValue={animal?.caes}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Gatos
            </label>

            <input
              name="gatos"
              defaultValue={animal?.gatos}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Crianças
            </label>

            <input
              name="criancas"
              defaultValue={animal?.criancas}
              className="w-full rounded-xl border p-3"
            />
          </div>
        </div>
      </section>

      {/* PERSONALIDADE */}

      <section className="rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-6 text-2xl font-bold">
          Personalidade
        </h2>

        <input
          name="personalidade"
          defaultValue={animal?.personalidade}
          placeholder="Afetuoso, Ativo, Curioso"
          className="w-full rounded-xl border p-3"
        />
      </section>

      {/* HISTÓRIA */}

      <section className="rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-6 text-2xl font-bold">
          História
        </h2>

        <textarea
          name="historia"
          rows={8}
          defaultValue={animal?.historia}
          className="w-full rounded-xl border p-3"
        />
      </section>

      {/* FOTO */}

      <section className="rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-6 text-2xl font-bold">
          Foto
        </h2>

        <input
          name="fotoUrl"
          defaultValue={animal?.fotoUrl}
          placeholder="/animais/alex.png"
          className="w-full rounded-xl border p-3"
        />
      </section>

      {/* BOTÃO */}

      <div className="flex justify-end">
        <button
          type="submit"
          className="
            rounded-xl
            bg-[#f58220]
            px-6
            py-3
            font-semibold
            text-white
          "
        >
          Salvar Animal
        </button>
      </div>
    </form>
  );
}