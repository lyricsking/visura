import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FC, HTMLAttributes } from "react";
import { Item } from "./item";

type SortableProps = HTMLAttributes<HTMLElement> & {
  id: string;
};

export const Sortable: FC<SortableProps> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    border: "1px solid #ddd",
    marginBottom: "8px",
    backgroundColor: isDragging ? "#f0f0f0" : "#fff",
  };

  return (
    <Item id={id} ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </Item>
  );
};
