import { ElementType, HTMLAttributes, JSX } from "react";
import Button from "~/components/button";

export const Blocks: Record<string, ElementType> = {
  div: "div",
  header: "header",
  main: "main",
  section: "section",
  footer: "footer",
  h1: "h1",
  h2: "h2",
  p: "p",
  button: Button,
} as const;

export type BlockType = keyof typeof Blocks;

export interface OnClickEvent {
  type: "navigation" | "toggle" | "submit";
  data: {
    path?: string;
  };
}

export interface BlockProps
  extends Omit<HTMLAttributes<HTMLElement>, "onClick" | "children"> {
  onClick?: OnClickEvent;
}

export interface BlockMetadata {
  type: BlockType;
  props: BlockProps;
  children: BlockMetadata[];
}
