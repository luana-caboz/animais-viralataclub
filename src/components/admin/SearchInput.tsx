"use client";

import { useState } from "react";

export function SearchInput() {
  const [value, setValue] = useState("");

  return (
    <input
      value={value}
      onChange={(e) =>
        setValue(e.target.value)
      }
      placeholder="Buscar animal..."
      className="
        w-full
        rounded-2xl
        border
        p-4
      "
    />
  );
}