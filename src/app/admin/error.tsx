"use client";

type Props = {
  error: Error & {
    digest?: string;
  };

  reset: () => void;
};

export default function AdminError({
  error,
  reset,
}: Props) {
  console.error(error);

  return (
    <div className="p-10">
      <div
        className="
          rounded-3xl
          border
          border-red-100
          bg-white
          p-10
          shadow
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            text-red-500
          "
        >
          Erro no painel
        </h1>

        <p className="mt-4 text-slate-600">
          Algo deu errado durante a operação.
        </p>

        <div className="mt-8">
          <button
            onClick={() => reset()}
            className="
              rounded-2xl
              bg-[#0f4fb6]
              px-6
              py-3
              font-semibold
              text-white
            "
          >
            Tentar novamente
          </button>
        </div>
      </div>
    </div>
  );
}