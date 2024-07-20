import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "~/utils";
import { twMerge } from "tailwind-merge";

const avatarVariant = cva("", {
  variants: {
    variant: {
      square: "rounded",
      circle: "rounded-full",
    },
    size: {
      xs: "h-8 w-8",
      sm: "h-12 w-12",
      md: "h-16 w-16",
      lg: "h-20 w-20",
      xl: "h-36 w-36",
    },
    ring: {
      none: "ring-0",
      2: "ring-2",
      normal: "ring",
      4: "ring-4",
      8: "ring-8",
    },
  },
  defaultVariants: {
    variant: "circle",
    size: "md",
    ring: "none",
  },
});

export type AvatarProps = React.ComponentPropsWithRef<"img"> &
  VariantProps<typeof avatarVariant> & {
    src: string;
    //fallback: React.ReactElement;
    ringColor?: React.CSSProperties["color"];
  };

export default function Avatar(props: AvatarProps) {
  const { ref, className, src, variant, size, ring, ...attrs } = props;

  return (
    <img
      ref={ref}
      className={cn(avatarVariant({ variant, size, ring }), className)}
      {...attrs}
      src={src}
      alt=""
    />
  );
}
