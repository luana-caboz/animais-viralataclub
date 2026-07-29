export function slugifyAnimal(
  nome: string,
  id: string
) {
  return `${nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")}-${id.toLowerCase()}`;
}

export function getIdFromSlug(
  slug: string
) {
  return slug.split("-").pop()?.toUpperCase();
}

export function formatarData(
  data?: string | null
) {
  if (!data) {
    return "Data não informada";
  }

  const date = new Date(data);

  if (isNaN(date.getTime())) {
    return "Data não informada";
  }

  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }
  ).format(date);
}