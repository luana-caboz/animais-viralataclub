"use client";

export function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="
        rounded-xl
        border
        px-4
        py-2
        text-sm
        font-medium
        text-slate-600
        hover:bg-slate-50
      "
    >
      ← Voltar
    </button>
  );
}