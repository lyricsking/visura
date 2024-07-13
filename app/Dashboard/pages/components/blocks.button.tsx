import Button from "~/shared/components/button";
import { BlockProps, TagEditors } from "./block";
import { customAlphabet } from "nanoid";

type BlockButtonsProps = {
  onAddBlock: (props: BlockProps) => void;
};
export function BlockButtons(props: BlockButtonsProps) {
  const { onAddBlock } = props;

  const getBlockId = () => {
    const alphabet =
      "0123456789ABCDEFGHIJKLMNOPQRSTUabcdefghijklmnopqrstuvwxyz";
    const nanoid = customAlphabet(alphabet, 8);
    return nanoid();
  };

  const addBlock = (type: TagEditors) => {
    const id = getBlockId();
    onAddBlock({ id, type, background: "#ff9900", attrs: {} });
  };

  return (
    <div className="flex items-center justify-between gap-[20px] my-[20px] ">
      <Button
        variant="outline"
        radius={"md"}
        onClick={() => addBlock("Button")}
      >
        Button
      </Button>

      <Button variant="outline" radius={"md"} onClick={() => addBlock("Text")}>
        Text
      </Button>
    </div>
  );
}
