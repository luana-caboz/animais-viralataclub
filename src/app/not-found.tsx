import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf8f4] px-6">
      <div
        className="
          max-w-lg
          rounded-3xl
          bg-white
          p-10
          text-center
          shadow-xl
        "
      >
        <div className="mb-6 text-7xl">
          🐾
        </div>

        <h1
          className="
            text-4xl
            font-extrabold
            text-[#0f4fb6]
          "
        >
          Página não encontrada
        </h1>

        <p className="mt-4 text-slate-600">
          A página que você tentou acessar
          não existe.
        </p>

        <Link
          href="/"
          className="
            mt-8
            inline-flex
            rounded-2xl
            bg-[#f58220]
            px-6
            py-3
            font-semibold
            text-white
          "
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}