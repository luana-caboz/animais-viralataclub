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

export function formatarData(data: string) {
  return new Date(data).toLocaleDateString(
    "pt-BR",
    {
      month: "long",
      year: "numeric",
    }
  );
}