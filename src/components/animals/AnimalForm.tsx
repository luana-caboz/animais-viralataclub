"use client";

import Image from "next/image";
import {
  useState,
  useActionState,
  useEffect,
} from "react";
import { toast } from "sonner";
import { Animal } from "@/types/animal";
import {
  createAnimal,
  updateAnimal,
} from "@/app/actions/animals";
import { uploadAnimalImage } from "@/lib/upload-image";
import { SubmitButton } from "@/components/admin/SubmitButton";

type Props = {
  animal?: Partial<Animal>;
};

type FormState = {
  success?: boolean;
  error?: string;
} | null;

export default function AnimalForm({
  animal,
}: Props) {
  const [fotoUrl, setFotoUrl] =
    useState(
      animal?.fotoUrl || ""
    );

  const [uploading, setUploading] =
    useState(false);

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const url =
        await uploadAnimalImage(file);

      setFotoUrl(url);
      toast.success(
        "Imagem enviada com sucesso!"
      );
    } catch {
      toast.error(
        "Erro ao enviar imagem"
      );
    } finally {
      setUploading(false);
    }
  }

  const [state, formAction] =
    useActionState<FormState, FormData>(
      animal?.id
        ? updateAnimal.bind(
            null,
            animal.id
          )
        : createAnimal,
      null
    );

  useEffect(() => {
    if (state?.success) {
      toast.success(
        "Animal salvo com sucesso!"
      );
    }

    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
      <form
        action={formAction}
        className="space-y-8"
      >
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
              <option>Filhote</option>
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
              defaultValue={
                animal?.dataNascimento
              }
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
              defaultValue={
                animal?.dataResgate
              }
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
              defaultChecked={
                animal?.castrado
              }
            />
            Castrado
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="vacinado"
              defaultChecked={
                animal?.vacinado
              }
            />
            Vacinado
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="vermifugado"
              defaultChecked={
                animal?.vermifugado
              }
            />
            Vermifugado
          </label>

          <div>
            <label className="mb-2 block font-medium">
              Condições de saúde
            </label>

            <input
              name="condicoesSaude"
              defaultValue={
                animal?.condicoesSaude
              }
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
              defaultValue={
                animal?.criancas
              }
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
          defaultValue={
            animal?.personalidade
          }
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
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Foto
          </h2>

          {fotoUrl && (
            <button
              type="button"
              onClick={() => {
                setFotoUrl("");
                toast.success("Foto removida com sucesso");
              }}
              className="
                rounded-xl
                px-4
                py-2
                text-sm
                font-medium
                text-red-500
                transition
                hover:bg-red-50
              "
            >
              Remover foto
            </button>
          )}
        </div>

        <div className="space-y-5">
          {/* PREVIEW */}

          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              border-2
              border-dashed
              border-slate-200
              bg-slate-50
            "
          >
            {fotoUrl ? (
              <Image
                src={fotoUrl}
                alt="Preview"
                width={600}
                height={600}
                className="
                  h-[340px]
                  w-full
                  object-cover
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-[340px]
                  flex-col
                  items-center
                  justify-center
                  gap-4
                  text-center
                "
              >
                <div
                  className="
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-4xl
                    shadow-sm
                  "
                >
                  🐾
                </div>

                <div>
                  <p className="text-lg font-semibold text-slate-700">
                    Nenhuma foto enviada
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    PNG, JPG ou WEBP até
                    5MB
                  </p>
                </div>
              </div>
            )}

            {/* LOADING OVERLAY */}

            {uploading && (
              <div
                className="
                  absolute
                  inset-0
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-4
                  bg-black/50
                  backdrop-blur-sm
                "
              >
                <div
                  className="
                    h-14
                    w-14
                    animate-spin
                    rounded-full
                    border-4
                    border-white/30
                    border-t-white
                  "
                />

                <p className="font-medium text-white">
                  Enviando imagem...
                </p>
              </div>
            )}
          </div>

          {/* INPUT */}

          <div className="flex flex-wrap gap-3">
            <label
              className="
                inline-flex
                cursor-pointer
                items-center
                rounded-2xl
                bg-[#0f4fb6]
                px-5
                py-3
                font-semibold
                text-white
                transition
                hover:scale-[1.02]
                hover:shadow-lg
              "
            >
              {fotoUrl
                ? "Trocar Foto"
                : "Selecionar Foto"}

              <input
                type="file"
                accept="
                  image/png,
                  image/jpeg,
                  image/webp
                "
                hidden
                onChange={handleUpload}
              />
            </label>

            {fotoUrl && (
              <button
                type="button"
                onClick={() =>
                  window.open(
                    fotoUrl,
                    "_blank"
                  )
                }
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  px-5
                  py-3
                  font-medium
                  text-slate-600
                  transition
                  hover:bg-slate-50
                "
              >
                Visualizar
              </button>
            )}
          </div>

          {/* URL HIDDEN */}

          <input
            type="hidden"
            name="fotoUrl"
            value={fotoUrl}
          />
        </div>
      </section>

      {/* BOTÃO */}

      <div className="flex justify-end">
        <SubmitButton
          text={
            uploading
              ? "Aguarde upload..."
              : "Salvar Animal"
          }
          loadingText="Salvando..."
          disabled={uploading}
        />
      </div>
    </form>
  );
}