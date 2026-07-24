"use client";

import { deleteAnimal } from "@/modules/animals/actions/animals";

type Props = {
  id: string;
};

export function DeleteAnimalButton({
  id,
}: Props) {
  return (
    <form
      action={deleteAnimal.bind(
        null,
        id
      )}
      onSubmit={(event) => {
        const confirmed = confirm(
          "Deseja realmente excluir este animal?"
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="
          rounded-xl
          px-4
          py-2
          text-red-500
          transition
          hover:bg-red-50
        "
      >
        Excluir
      </button>
    </form>
  );
}