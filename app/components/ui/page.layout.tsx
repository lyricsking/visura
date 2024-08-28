import ScrollToTop from "~/components/ui/scroll.to.top";
import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";

interface PageLayoutProps extends React.ComponentPropsWithRef<"div"> {
  asChild?: boolean;
}
const PageLayout = React.forwardRef<HTMLDivElement, PageLayoutProps>(
  ({ className, asChild, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        className={twMerge("flex flex-col min-h-screen w-full", className)}
        {...props}
      >
        {children}
        <ScrollToTop />
      </Comp>
    );
  }
);
PageLayout.displayName = "PageLayout";

const pageHeaderVariants = cva("flex flex-col w-full text-sm font-medium", {
  variants: {
    position: {
      relative: "relative",
      sticky: "sticky z-40 top-0 left-0 right-0",
      fixed: "fixed z-40 top-0 left-0 right-0 ",
    },
  },
  defaultVariants: {
    position: "relative",
  },
});
interface PageLayoutHeaderProps
  extends React.ComponentPropsWithRef<"header">,
    VariantProps<typeof pageHeaderVariants> {
  asChild?: boolean;
}
const PageLayoutHeader = React.forwardRef<
  HTMLDivElement,
  PageLayoutHeaderProps
>(({ className, asChild, position, ...props }, ref) => {
  const Comp = asChild ? Slot : "header";
  return (
    <Comp
      ref={ref}
      className={twMerge(clsx(pageHeaderVariants({ position }), className))}
      {...props}
    />
  );
});
PageLayoutHeader.displayName = "PageLayoutHeader";

const headerItemVariants = cva("flex flex-row items-center justify-between", {
  variants: {
    spacing: {
      normal: "gap-x-4 py-8 px-8 md:py-4 md:px-4",
      compact: "gap-x-2 py-4 px-4 md:py-2 md:px-2",
    },
  },
  defaultVariants: {
    spacing: "normal",
  },
});
interface PageLayoutHeaderItemProps
  extends React.ComponentPropsWithRef<"div">,
    VariantProps<typeof headerItemVariants> {
  asChild?: boolean;
}
const PageLayoutHeaderItem = React.forwardRef<
  HTMLDivElement,
  PageLayoutHeaderItemProps
>(({ className, asChild, spacing, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      ref={ref}
      className={twMerge(headerItemVariants({ spacing }), className)}
      {...props}
    />
  );
});
PageLayoutHeaderItem.displayName = "PageLayoutHeaderItem";

const pageContentVariants = cva("flex-1 flex flex-col gap-4", {
  variants: {},
  defaultVariants: {},
});
type PageLayoutContentProps = React.ComponentPropsWithRef<"main"> &
  VariantProps<typeof pageContentVariants> & {
    asChild?: boolean;
  };
const PageLayoutContent = React.forwardRef<
  HTMLDivElement,
  PageLayoutContentProps
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "main";
  return (
    <Comp
      ref={ref}
      className={twMerge(pageContentVariants({}), className)}
      {...props}
    />
  );
});
PageLayoutContent.displayName = "PageLayoutContent";

const pageFooterVariants = cva("grid gap-x-4", {
  variants: {
    columns: {
      "1": "grid-cols-1",
      "2": "grid-cols-2",
      "3": "grid-cols-3",
      "4": "grid-cols-4",
    },
  },
  defaultVariants: {
    columns: "1",
  },
});
type PageLayoutFooterProps = React.ComponentPropsWithRef<"footer"> &
  VariantProps<typeof pageFooterVariants> & {
    asChild?: boolean;
  };
const PageLayoutFooter = React.forwardRef<
  HTMLDivElement,
  PageLayoutFooterProps
>(({ className, columns, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "header";
  return (
    <Comp
      ref={ref}
      className={twMerge(pageFooterVariants({ columns }), className)}
      {...props}
    />
  );
});
PageLayoutFooter.displayName = "PageLayoutFooter";

export {
  PageLayout,
  PageLayoutHeader,
  type PageLayoutHeaderProps,
  type pageHeaderVariants,
  PageLayoutHeaderItem,
  type headerItemVariants,
  type PageLayoutHeaderItemProps,
  PageLayoutContent,
  type PageLayoutContentProps,
  type pageContentVariants,
  PageLayoutFooter,
  type PageLayoutFooterProps,
  type pageFooterVariants,
};
