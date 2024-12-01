import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FC, forwardRef, HTMLAttributes } from "react";

import { Grab, GrabIcon, Grip } from "lucide-react";

type SortableProps = HTMLAttributes<HTMLElement> & {
  id: string;
};

export const Sortable: FC<SortableProps> = ({ id, children, ...props }) => {
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
    <Item
      id={id}
      ref={setNodeRef}
      {...props}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </Item>
  );
};

type ItemProps = HTMLAttributes<HTMLElement> & {
  id: string;
};
export const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, children, ...props }, ref) => {
    return (
      <div id={id} {...props} ref={ref}>
        <div className="flex items-center gap-2 p-2">
          <Grip />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    );
  }
);
