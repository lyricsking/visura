import AppContext from "~/app";
import text from "./text";

export interface Page {
  blocks: { id: string; type: string; props: any }[];
}

export default interface Block<T> {
  type: string; // Unique type identifier for the block
  props: T; // Props specific to the block
  render: (props: T) => JSX.Element; // Function to render the block
  version: number; // Version number for consistency
}

const c: Page = {
  blocks: [
    {
      id: "",
      type: "t",
      props: undefined,
    },
  ],
};

export const blocks = (app: AppContext) => {
  app.configure(text);
};
