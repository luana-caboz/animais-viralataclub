"use client";

import { AnimalImage } from "@/types/animal-image";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import SortableImage from "./SortableImage";

type Props = {
  value: AnimalImage[];
  onChange: (
    images: AnimalImage[]
  ) => void;
};

export default function AnimalImagesManager({
  value,
  onChange,
}: Props) {
  function updateImage(
    updated: AnimalImage
  ) {
    onChange(
      value.map((image) =>
        image.id === updated.id
          ? updated
          : image
      )
    );
  }

  function removeImage(id: string) {
    onChange(
      value.filter(
        (image) =>
          image.id !== id
      )
    );
  }

  function setPrincipal(id: string) {
    onChange(
      value.map((image) => ({
        ...image,
        principal:
          image.id === id,
      }))
    );
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = value.findIndex((image) => image.id === active.id);
    const newIndex = value.findIndex((image) => image.id === over.id);

    if (oldIndex < 0 || newIndex < 0) {
      return;
    }

    onChange(
      arrayMove(value, oldIndex, newIndex).map((image, index) => ({
        ...image,
        ordem: index,
      }))
    );
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={value.map((image) => image.id)}
        strategy={rectSortingStrategy}
      >
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {value.map((image) => (
            <SortableImage
              key={image.id}
              image={image}
              onChange={updateImage}
              onDelete={() => removeImage(image.id)}
              onSetPrincipal={() => setPrincipal(image.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
