export function parseBoolean(value?: string) {
  if (!value) return false;

  const normalized = value
    .trim()
    .toLowerCase();

  return [
    "sim",
    "true",
    "1",
    "x",
  ].includes(normalized);
}

export function parseStatus(
  status: string
) {
  switch (status.trim()) {
    case "Disponível":
      return "DISPONIVEL";

    case "Adotado":
      return "ADOTADO";

    case "Em tratamento":
      return "EM_TRATAMENTO";

    default:
      return "DISPONIVEL";
  }
}

export function parseDate(
  value?: string
) {
  if (!value) return undefined;

  const [dia, mes, ano] =
    value.split("/");

  if (!ano) return undefined;

  return `${ano}-${mes.padStart(
    2,
    "0"
  )}-${dia.padStart(2, "0")}`;
}