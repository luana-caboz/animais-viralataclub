export function parseAnimalFolder(
  folderName: string
) {
  const match =
    folderName.match(
      /^\[(.+?)\]\s*(.+)$/
    );

  if (!match) {
    return null;
  }

  return {
    animalId: match[1],
    animalName: match[2],
  };
}