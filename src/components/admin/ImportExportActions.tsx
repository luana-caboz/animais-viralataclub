"use client";

import Link from "next/link";
import { useState } from "react";
import {toast} from "sonner";

export function ImportExportActions() {
  const [loading, setLoading] =
    useState(false);

  async function handleImport(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    setLoading(true);

    try {
      const response =
        await fetch("/api/import", {
          method: "POST",
          body: formData,
        });

      if (!response.ok) {
        throw new Error(
          "Erro ao importar planilha"
        );
      }

      toast.success(
        "Importação concluída!"
      );

      location.reload();
    } catch {
      toast.error(
        "Erro ao importar planilha"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-4">
      <Link
        href="/admin/animals/novo"
        className="
          rounded-2xl
          bg-[#f58220]
          px-6
          py-3
          font-semibold
          text-white
        "
      >
        + Novo Animal
      </Link>

      <label
        className={`
          cursor-pointer
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-6
          py-3
          font-medium
          transition
          hover:border-[#f58220]
          hover:text-[#f58220]
          ${
            loading
              ? "pointer-events-none opacity-70"
              : ""
          }
        `}
      >
        {loading
          ? "Importando..."
          : "📥 Importar XLSX"}

        <input
          type="file"
          accept=".xlsx"
          hidden
          onChange={
            handleImport
          }
        />
      </label>

      <a
        href="/api/export"
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-6
          py-3
          font-medium
          transition
          hover:border-[#0f4fb6]
          hover:text-[#0f4fb6]
        "
      >
        📤 Exportar XLSX
      </a>
    </div>
  );
}