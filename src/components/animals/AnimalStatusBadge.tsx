type AnimalStatusBadgeProps = {
  status: string;
};

const STATUS_STYLES: Record<string, string> = {
  DISPONIVEL: "bg-emerald-100 text-emerald-700",
  ADOTADO: "bg-sky-100 text-sky-700",
  EM_TRATAMENTO: "bg-amber-100 text-amber-700",
};

export default function AnimalStatusBadge({ status }: AnimalStatusBadgeProps) {
  const style = STATUS_STYLES[status] ?? "bg-slate-100 text-slate-700";

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${style}`}>
      {status}
    </span>
  );
}
