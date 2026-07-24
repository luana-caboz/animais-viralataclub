import AnimalForm from "@/modules/animals/components/AnimalForm";

export default function NewAnimalPage() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-8 text-4xl font-bold">
        Novo Animal
      </h1>

      <AnimalForm />
    </main>
  );
}