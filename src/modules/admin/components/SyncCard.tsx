"use client";

import { syncNow } from "@/app/actions/sync.action";
import { CheckCircle2, RefreshCw, XCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type SyncState = {
  animalsUpdated: number;
  imagesUpdated: number;
  durationMs: number;
  success: boolean;
};

export function SyncCard() {
  const [isPending, startTransition] =
    useTransition();

  const [lastSync, setLastSync] =
    useState<SyncState | null>(null);

  function handleSync() {
    startTransition(async () => {
      try {
        const result =
          await syncNow();

        setLastSync({
          animalsUpdated:
            result.animalsUpdated,
          imagesUpdated:
            result.imagesUpdated,
          durationMs:
            result.durationMs,
          success:
            result.success,
        });

        toast.success(
          "Sincronização concluída."
        );

      } catch {
        toast.error(
          "Erro durante a sincronização."
        );
      }
    });
  }

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-[#0f4fb6]">
            Sincronização
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Atualize animais e imagens a partir da planilha e do Google Drive.
          </p>

        </div>

        <button
          onClick={handleSync}
          disabled={isPending}
          className="flex items-center gap-2 rounded-lg bg-[#0f4fb6] px-4 py-2 text-white transition hover:bg-[#0d469f] disabled:opacity-50"
        >
          <RefreshCw
            size={18}
            className={
              isPending
                ? "animate-spin"
                : ""
            }
          />

          {isPending
            ? "Sincronizando..."
            : "Sincronizar agora"}
        </button>

      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">

        <CardInfo
          title="Animais"
          value={
            lastSync
              ? lastSync.animalsUpdated
              : "-"
          }
        />

        <CardInfo
          title="Imagens"
          value={
            lastSync
              ? lastSync.imagesUpdated
              : "-"
          }
        />

        <CardInfo
          title="Tempo"
          value={
            lastSync
              ? `${(
                  lastSync.durationMs / 1000
                ).toFixed(1)} s`
              : "-"
          }
        />

        <CardInfo
          title="Status"
          value={
            lastSync
              ? (
                  <span className="flex items-center gap-2">

                    {lastSync.success ? (
                      <>
                        <CheckCircle2
                          size={18}
                          className="text-green-600"
                        />

                        Sucesso
                      </>
                    ) : (
                      <>
                        <XCircle
                          size={18}
                          className="text-red-600"
                        />

                        Erro
                      </>
                    )}

                  </span>
                )
              : "-"
          }
        />

      </div>

    </section>
  );
}

type CardInfoProps = {
  title: string;
  value: React.ReactNode;
};

function CardInfo({
  title,
  value,
}: CardInfoProps) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <div className="mt-2 text-lg font-semibold">
        {value}
      </div>

    </div>
  );
}