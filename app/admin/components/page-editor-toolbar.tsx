import { Eye, Settings } from "lucide-react";
import Button from "~/components/button";

type ToolbarProps = {
  addBlock: (type: string) => void;
};
export function PageEditorToolbar({ addBlock }: ToolbarProps) {
  return (
    <div className="w-20 bg-gray-800 text-white p-2 flex space-x-2">
      <Button>
        <Eye className="w-5 h-5" />
      </Button>

      <Button>Add Block</Button>

      <Button>
        <Settings className="w-5 h-5" />
      </Button>
    </div>
  );
}
