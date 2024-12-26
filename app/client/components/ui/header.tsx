import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const HeaderVariants = cva(
  "flex flex-row items-center justify-between gap-x-4 text-sm font-medium",
  {
    variants: {
      flow: {
        normal: "",
        sticky: "sticky top-0 z-50",
        fixed: "fixed top-0 z-50",
      },
    },
    defaultVariants: {
      flow: "normal",
    },
  }
);
interface HeaderProps extends React.ComponentPropsWithRef<"div"> {
  asChild?: boolean;
}
const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return <Comp ref={ref} {...props} className={twMerge(className)} />;
  }
);
Header.displayName = "Header";

interface HeaderTopProps extends React.ComponentPropsWithRef<"div"> {
  asChild?: boolean;
}
const HeaderTop = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        {...props}
        className={twMerge(
          "flex flex-row items-center justify-between gap-x-4",
          className
        )}
      />
    );
  }
);
HeaderTop.displayName = "HeaderTop";

interface HeaderTrailingProps extends React.ComponentPropsWithRef<"div"> {
  asChild?: boolean;
}
const HeaderTrailing = React.forwardRef<HTMLDivElement, HeaderTrailingProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return <Comp ref={ref} {...props} className={twMerge("p-4", className)} />;
  }
);
HeaderTrailing.displayName = "HeaderTrailing";

const HeaderCenter = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return <Comp ref={ref} {...props} className={twMerge("p-xs", className)} />;
  }
);
HeaderCenter.displayName = "HeaderCenter";

const HeaderLeading = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return <Comp ref={ref} {...props} className={twMerge(className)} />;
  }
);
HeaderLeading.displayName = "HeaderLeading";

const HeaderBottom = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return <Comp ref={ref} {...props} className={twMerge(className)} />;
  }
);
HeaderBottom.displayName = "HeaderBottom";
