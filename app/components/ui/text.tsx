import { FC } from "react";
import { ComponentInfo } from "../../core/block";

export type TextProps = {
  /** The text content to display */
  text: string;
  /** Optional CSS classes to style the text component */
  class?: string;
  /**
   * Optional HTML tag to render the text (e.g. `p`, `span`, `div`).
   * Defaults to `p`.
   */
  as?: keyof JSX.IntrinsicElements;
};

/**
 * A flexible Text component for rendering textual content.
 * Supports custom styles and semantic HTML element
 */
const Text: FC<TextProps> = ({
  text,
  class: className = "",
  as = `p`,
}: TextProps) => {
  const Component = as; // Dynamically render the specified HTML element

  return (
    <Component className={`text-base text-gray-800 ${className}`}>
      {text}
    </Component>
  );
};

export const TextInfo: ComponentInfo = {
  component: Text,
  description: "",
  instructions: "",
  props: {},
  usageExample: `- type: text
  props:
    text: I am Jamiu
    as: 'p'
    class: "font-bold"`,
};

export default Text;
