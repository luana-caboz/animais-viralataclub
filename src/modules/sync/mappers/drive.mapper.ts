export function mapperAnimalFolder(
  folderName: string,
  status: "DISPONIVEL" | "ADOTADO"
) {
  const start = folderName.indexOf("[");
  const end = folderName.indexOf("]");

  if (start === -1 || end === -1) {
    return null;
  }

  const animalId = folderName
    .slice(start + 1, end)
    .trim();

  const animalName = folderName
    .slice(end + 1)
    .trim();

  if (!animalId || !animalName) {
    return null;
  }

  return {
    animalId,
    animalName,
    status,
  };
}