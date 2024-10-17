import { ReactNode } from "react";

interface Block<T> {
  type: string; // Unique type identifier for the block
  props: T; // Props specific to the block
  render: (props: T) => JSX.Element; // Function to render the block
}

// A mapping of block names to types. Will be extended in block files.
export interface BlockTypes {}
