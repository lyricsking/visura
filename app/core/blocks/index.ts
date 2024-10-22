import { HTMLAttributes } from "react";
import Button from "~/core/components/button";

export const Blocks = {
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
  type: "alert" | "navigation" | "submit" | "toggle";
  data: {
    path?: string;
  };
}

export interface BlockProps
  extends Omit<HTMLAttributes<HTMLElement>, "onClick"> {
  onClick?: OnClickEvent;
}

export interface BlockMetadata {
  blockId: string;
  type: BlockType;
  props?: BlockProps;
  blocks?: BlockMetadata[];
}
