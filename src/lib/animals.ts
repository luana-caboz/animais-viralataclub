import animals from "@/data/animals_melhor.json";

export function slugifyAnimal(nome: string, id: string) {
  return `${nome}-${id}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

export function getAnimals() {
  return animals;
}

export function getAnimalBySlug(slug: string) {
  return animals.find(
    (animal) =>
      slugifyAnimal(animal.nome, animal.id) === slug
  );
}