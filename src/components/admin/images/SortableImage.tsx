"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { AnimalImage } from "@/types/animal-image";
import AnimalImageCard from "./AnimalImageCard";

type Props = {
  image: AnimalImage;
  onChange: (image: AnimalImage) => void;
  onDelete: () => void;
  onSetPrincipal: () => void;
};

export default function SortableImage({
  image,
  onChange,
  onDelete,
  onSetPrincipal,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: image.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="touch-none"
    >
      <AnimalImageCard
        image={image}
        onChange={onChange}
        onDelete={onDelete}
        onSetPrincipal={onSetPrincipal}
      />
    </div>
  );
}