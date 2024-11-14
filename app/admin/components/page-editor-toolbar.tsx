import { Eye, Settings } from "lucide-react";
import Button from "~/components/button";
import { BlockMetadata } from "~/core/blocks/block";

type ToolbarProps = {
  addBlock: (blockMeta: BlockMetadata) => void;
};
export function PageEditorToolbar({ addBlock }: ToolbarProps) {
  return (
    <div className="w-full bg-white text-white p-2 rounded shadow-md flex justify-between space-x-4">
      <Button>
        <Eye />
      </Button>

      <Button>Add Block</Button>

      <Button>
        <Settings className="w-5 h-5" />
      </Button>
    </div>
  );
}
