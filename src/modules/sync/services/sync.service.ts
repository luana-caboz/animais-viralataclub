export type SyncResult = {
  status: "not_configured";
  message: string;
  animalsUpdated: number;
  imagesUpdated: number;
};

/**
 * Ponto de orquestração da sincronização.
 */
export async function runSync(): Promise<SyncResult> {
  return {
    status: "not_configured",
    message: "A sincronização automática ainda não foi configurada.",
    animalsUpdated: 0,
    imagesUpdated: 0,
  };
}
