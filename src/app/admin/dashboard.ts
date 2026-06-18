import { supabase } from "@/lib/supabase";

export async function getDashboardStats() {
  const { data } = await supabase
    .from("animals")
    .select("status");

  const disponiveis =
    data?.filter(
      (a) => a.status === "DISPONIVEL"
    ).length ?? 0;

  const adotados =
    data?.filter(
      (a) => a.status === "ADOTADO"
    ).length ?? 0;

  return {
    disponiveis,
    adotados,
    total: data?.length ?? 0,
  };
}