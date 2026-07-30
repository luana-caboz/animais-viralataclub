"use client";

import { syncNow } from "@/app/actions/sync.action";
import { useTransition } from "react";
import { toast } from "sonner";

export function SyncButton() {
  const [isPending, startTransition] =
    useTransition();

  function handleSync() {
    startTransition(async () => {
      try {
        const result =
          await syncNow();

        toast.success(
          `${result.animalsUpdated} animais e ${result.imagesUpdated} imagens sincronizados.`
        );

      } catch {
        toast.error(
          "Erro ao sincronizar."
        );
      }
    });
  }

  return (
    <button
      onClick={handleSync}
      disabled={isPending}
      className="rounded-lg bg-[#0f4fb6] px-4 py-2 font-medium text-white hover:bg-[#0d469f] disabled:opacity-50"
    >
      {isPending
        ? "Sincronizando..."
        : "Sincronizar agora"}
    </button>
  );
}