"use client";

import { useRouter } from "next/navigation";

export function AnimalFilters() {
  const router = useRouter();

  return (
    <div className="flex gap-4">
      <select
        className="
          rounded-xl
          border
          px-4
          py-3
        "
        onChange={(e) =>
          router.push(
            `/admin/animals?status=${e.target.value}`
          )
        }
      >
        <option value="TODOS">
          Todos
        </option>

        <option value="DISPONIVEL">
          Disponíveis
        </option>

        <option value="ADOTADO">
          Adotados
        </option>
      </select>
    </div>
  );
}