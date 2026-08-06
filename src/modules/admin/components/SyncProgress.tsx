type Props = {
  processed: number;
  total: number;
  uploadedImages: number;
};

export function SyncProgress({
  processed,
  total,
  uploadedImages,
}: Props) {
  const percentage =
    total === 0
      ? 0
      : Math.round((processed / total) * 100);

  return (
    <div className="mt-6 rounded-xl border bg-slate-50 p-4">
      <div className="mb-2 flex justify-between text-sm">
        <span>
          {processed} / {total} animais
        </span>

        <span>{percentage}%</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-[#0f4fb6] transition-all duration-300"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <p className="mt-3 text-sm text-slate-600">
        Imagens sincronizadas:{" "}
        <strong>{uploadedImages}</strong>
      </p>
    </div>
  );
}