import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot";
import { ChevronDownIcon } from "@heroicons/react/16/solid"

import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


interface NavigationMenuProps extends 
  React.ComponentPropsWithoutRef<'nav'>
{
  asChild?: boolean,
  orientation: "horizontal" | "vertical"
}
const NavigationMenu = React.forwardRef<
  React.ElementRef<"nav">, NavigationMenuProps
>((props, ref) => {
  
  const { asChild, children, className, orientation= "horizontal", ...otherProps } = props;
  
  const Tag = asChild ? Slot : "nav";
  return (<Tag
    ref={ref}
    className={cn(
      "relative inline-flex items-center justify-center max-w-full",
      className
    )}
    {...otherProps}
  >
    {children}
  </Tag>
  )});
NavigationMenu.displayName = "NavigationMenu";

interface NavigationMenuListProps extends
React.ComponentPropsWithoutRef <'ul'>
{
  asChild ? : boolean
}
const NavigationMenuList = React.forwardRef <
  React.ElementRef <"ul"> ,
  NavigationMenuListProps >
  ((props, ref) => {

    const { asChild, className, ...otherProps } = props;

    const Tag = asChild ? Slot : "ul";
    return (<Tag
    ref={ref}
    className={cn(
      "inline-block list-none h-full w-full whitespace-nowrap overflow-hidden overflow-x-auto no-scrollbar",
      className
    )}
    {...otherProps}
  />)
  });
NavigationMenuList.displayName = "NavigationMenuList"


const navigationMenuItemVariants = cva(
  "list-none items-center justify-center whitespace-nowrap text-sm font-medium",
  {
    variants: {
      
    },
    defaultVariants: {
    },
  }
);
interface NavigationMenuItemProps extends
React.ComponentPropsWithoutRef <'li'>
{
  asChild ? : boolean
}
const NavigationMenuItem = React.forwardRef <
  React.ElementRef <"li"> ,
  NavigationMenuItemProps >
  ((props, ref) => {

    const { asChild, className, ...otherProps } = props;
    
    const x = "inline"

    const Tag = asChild ? Slot : "li";
    return (
      <Tag
        ref={ref}
        className={cn(
          x,
          "list-none items-center justify-center py-2 px-4 whitespace-nowrap text-sm font-medium",
          className
        )}
        {...otherProps}
      />
    );
  });
NavigationMenuItem.displayName = "NavigationMenuItem"

export {
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem
}