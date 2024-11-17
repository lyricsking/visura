import { Grip } from "lucide-react";
import { forwardRef, HTMLAttributes } from "react";

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
