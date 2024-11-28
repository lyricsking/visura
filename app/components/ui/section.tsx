import { FC, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentInfo } from "~/core/block";

export interface SectionProps extends VariantProps<typeof sectionClasses> {
  /** Content inside the Section */
  // children: ReactNode;
  blocks?: any;

  /** Custom class names to override default styling */
  className?: string;

  /** Unique identifier for the section */
  id?: string;

  /** HTML tag for the root container */
  as?: keyof JSX.IntrinsicElements;

  /** Grid-specific properties */
  gridCols?: string; // Tailwind grid-cols-* value
  gridRows?: string; // Tailwind grid-rows-* value
  colSpan?: string; // Tailwind col-span-* value
  rowSpan?: string; // Tailwind row-span-* value

  /** Flex-specific properties */
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  justifyContent?: "start" | "end" | "center" | "between" | "around" | "evenly";
  alignItems?: "start" | "end" | "center" | "baseline" | "stretch";
}

const sectionClasses = cva("w-full", {
  variants: {
    container: {
      true: "container mx-auto",
      false: "",
    },
    layout: {
      default: "",
      grid: "grid",
      flex: "flex",
    },
    gap: {
      none: "",
      small: "gap-2",
      medium: "gap-4",
      large: "gap-6",
      xlarge: "gap-8",
    },
    padding: {
      none: "",
      small: "py-4",
      medium: "py-8",
      large: "py-12",
    },
    background: {
      none: "",
      light: "bg-gray-50",
      dark: "bg-gray-800 text-white",
      primary: "bg-blue-600 text-white",
    },
  },
  defaultVariants: {
    container: true,
    layout: "default",
    gap: "none",
    padding: "medium",
    background: "none",
  },
});

const Section: FC<SectionProps> = ({
  // children,
  blocks,
  className = "",
  id,
  as: Component = "div",
  container,
  layout,
  gap,
  padding,
  background,
  gridCols,
  gridRows,
  colSpan,
  rowSpan,
  flexDirection,
  justifyContent,
  alignItems,
}) => {
  // Construct dynamic grid and flex classes
  const gridClasses = [
    gridCols && `grid-cols-${gridCols}`,
    gridRows && `grid-rows-${gridRows}`,
    colSpan && `col-span-${colSpan}`,
    rowSpan && `row-span-${rowSpan}`,
  ]
    .filter(Boolean)
    .join(" ");

  const flexClasses = [
    flexDirection && `flex-${flexDirection}`,
    justifyContent && `justify-${justifyContent}`,
    alignItems && `items-${alignItems}`,
  ]
    .filter(Boolean)
    .join(" ");

  const children = "test  content";

  return (
    <Component
      id={id}
      className={`${sectionClasses({
        container,
        layout,
        gap,
        padding,
        background,
        className,
      })} ${gridClasses} ${flexClasses}`}
    >
      {children}
    </Component>
  );
};

export default Section;

export const SectionInfo: ComponentInfo = {
  component: Section,
  description: "",
  instructions: "",
  props: {},
  usageExample: `- type: section
  props:
    blocks:
      - type: text
        props:
          text: Welcome to My Website
          as: 'p'
          class: "italic"
        
      - type: text
        props:
          text: I am Jamiu
          as: 'p'
          class: "font-bold"
  `,
};
