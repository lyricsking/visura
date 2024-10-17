import AppContext from "~/app";
import { Block } from "./types/block";

export class TextBlock implements Block {
  id: string;
  //type = "text";
  content: string;

  constructor() {
    this.content = "";
    this.id = "";
  }

  render() {
    return <div>{this.content}</div>;
  }
}

export default function text(app: AppContext) {
  app.addBlockType("text", TextBlock);
}

declare module "~/blocks/types/block" {
  interface BlockTypes {
    // You can dynamically add more block types here if needed
    text: TextBlock;
  }
}
