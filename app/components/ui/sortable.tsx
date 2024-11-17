import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FC, HTMLAttributes } from "react";
import { Item } from "./item";
import { Grab, GrabIcon, Grip } from "lucide-react";

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
    //backgroundColor: isDragging ? "#f0f0f0" : "#fff",
  };

  return (
    <Item id={id} ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {children}
    </Item>
  );
};
