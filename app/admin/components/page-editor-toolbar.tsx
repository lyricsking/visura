import { Eye, Settings } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import Button from "~/components/button";
import { DefaultBlocksProps } from "~/core/blocks/block";

type ToolbarProps = {
  addBlock: (blockMeta: DefaultBlocksProps) => void;
  showSettings: Dispatch<SetStateAction<boolean>>;
};

export function PageEditorToolbar({ addBlock, showSettings }: ToolbarProps) {
  return (
    <div className="w-full bg-white text-white p-2 rounded shadow-md flex justify-between">
      <Button className="bg-gray-200 text-gray-600">
        <Eye />
      </Button>

      <Button
        className="bg-gray-200 text-gray-600"
        onClick={() => showSettings(true)}
      >
        Add Block
      </Button>

      <Button className="bg-gray-200 text-gray-600">
        <Settings className="w-5 h-5" />
      </Button>
    </div>
  );
}
