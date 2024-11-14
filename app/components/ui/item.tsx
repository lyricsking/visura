import { forwardRef, HTMLAttributes } from "react";

type ItemProps = HTMLAttributes<HTMLElement> & {
  id: string;
};
export const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, children, ...props }, ref) => {
    return (
      <div id={id} {...props} ref={ref}>
        {children}
      </div>
    );
  }
);
