import { ReactNode } from "react";

// app/types/blockTypes.ts
export interface Block {
  //type: string; // Type of the block (e.g., 'text', 'image')
  id: string; // Unique identifier for the block
  render: () => ReactNode;
}

// A mapping of block names to types. Will be extended in block files.
export interface BlockTypes {}
