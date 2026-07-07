"use client";

type Props = {
  error: Error & {
    digest?: string;
  };

  reset: () => void;
};

export default function GlobalError({
  error,
  reset,
}: Props) {
  console.error(error);

  return (
    <html>
      <body className="bg-[#faf8f4]">
        <main className="flex min-h-screen items-center justify-center px-6">
          <div
            className="
              w-full
              max-w-lg
              rounded-3xl
              bg-white
              p-10
              text-center
              shadow-xl
            "
          >
            <div className="mb-6 text-6xl">
              🐶
            </div>

            <h1
              className="
                text-3xl
                font-extrabold
                text-[#0f4fb6]
              "
            >
              Oops!
            </h1>

            <p className="mt-4 text-slate-600">
              Algo inesperado aconteceu no sistema.
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Tente novamente ou recarregue a página.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => reset()}
                className="
                  rounded-2xl
                  bg-[#0f4fb6]
                  px-6
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:opacity-90
                "
              >
                Tentar novamente
              </button>

              <button
                onClick={() =>
                  window.location.href = "/admin"
                }
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  px-6
                  py-3
                  font-semibold
                  text-slate-700
                  transition
                  hover:bg-slate-50
                "
              >
                Ir para painel
              </button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}