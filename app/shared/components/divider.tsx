import { ComponentProps } from "react";

export const Alignment = {
  top: "top",
  right: "right",
  bottom: "bottom",
  left: "left",
  center: "center",
} as const 
export type Alignment = typeof Alignment[keyof typeof Alignment]

export type DividerProps = ComponentProps<'div'> & {
  align: Alignment,
}
export function Divider({ children, align = "center" }: DividerProps) {
  if (!children)
    return (
      <div className="border-t bg-gray-200" />
    );
  
  switch (align) {
    case Alignment.top:
    case Alignment.bottom:
    case Alignment.center:
      return (
        <div className="py-3 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
          {children}
        </div>
      );
    case Alignment.right:
      return (
        <div className="py-3 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-6">
          {children}
        </div>
      );
    case Alignment.left:
      return (
        <div className="py-3 flex items-center text-sm text-gray-800 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
          {children}
        </div>
      );
  }
}