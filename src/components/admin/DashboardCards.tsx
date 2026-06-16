type Props = {
  total: number;
  disponiveis: number;
  adotados: number;
};

function Card({
  titulo,
  valor,
  emoji,
}: {
  titulo: string;
  valor: number;
  emoji: string;
}) {
  return (
    <div
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div className="text-4xl">
        {emoji}
      </div>

      <div className="mt-4 text-5xl font-extrabold text-[#0f4fb6]">
        {valor}
      </div>

      <div className="mt-2 text-slate-500">
        {titulo}
      </div>
    </div>
  );
}

export function DashboardCards({
  total,
  disponiveis,
  adotados,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card
        titulo="Animais"
        valor={total}
        emoji="🐶"
      />

      <Card
        titulo="Disponíveis"
        valor={disponiveis}
        emoji="🏠"
      />

      <Card
        titulo="Adotados"
        valor={adotados}
        emoji="❤️"
      />
    </div>
  );
}