"use client";

import { useFormStatus } from "react-dom";

type Props = {
  text: string;
  loadingText: string;
  disabled?: boolean;
};

export function SubmitButton({
  text,
  loadingText,
}: Props) {
  const { pending } =
    useFormStatus();

  return (
    <button
      type="submit"
      className="
        rounded-xl
        bg-[#f58220]
        px-6
        py-3
        font-semibold
        text-white
        transition
        hover:scale-[1.02]
        hover:shadow-lg
        disabled:cursor-not-allowed
        disabled:opacity-70
      "
    >
      {pending
        ? loadingText
        : text}
    </button>
  );
}