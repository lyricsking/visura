import AppContext from "~/app";
import Block from ".";

interface TextBlockProps {
  content: string;
}

const TextBlock: Block<TextBlockProps> = {
  type: "",
  props: { content: "" },
  render(props) {
    return <div>{props.content}</div>;
  },
};

export default function text(app: AppContext) {
  app.registerBlock(TextBlock);
}
