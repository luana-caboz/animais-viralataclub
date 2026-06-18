"use client";

import Link from "next/link";

export function ImportExportActions() {
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

    await fetch(
      "/api/import",
      {
        method: "POST",
        body: formData,
      }
    );

    alert(
      "Importação concluída"
    );

    location.reload();
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
        className="
          cursor-pointer
          rounded-2xl
          border
          px-6
          py-3
        "
      >
        📥 Importar XLSX

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