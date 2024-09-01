import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        fill: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        text: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "max-h-8 min-w-8 text-sm px-2 py-2",
        md: "max-h-9 min-w-9 text-md px-4 py-2",
        lg: "max-h-10 min-w-10 text-lg px-8 py-2",
        icon: "max-h-12 w-12 py-2 m-auto",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        round: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "fill",
      size: "md",
      radius: "sm",
    },
  }
);

type ButtonProps = React.ComponentPropsWithRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    text?: string;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, radius, asChild, type = "button", ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={twMerge(
          buttonVariants({ variant, size, radius }),
          className
        )}
        {...props}
        type={type}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;
export { type ButtonProps, buttonVariants };
