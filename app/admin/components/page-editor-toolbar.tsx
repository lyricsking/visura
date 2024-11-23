import { Eye, Settings } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import Button from "~/components/button";
import { Blocks, DefaultBlocksProps, JSONDefaultBlocksProps } from "~/core/blocks/block";

import { Menu } from "~/types/menu";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/sheet";
import { Dialog, DialogContent, DialogTrigger } from "~/components/dialog";

type SettingsFunction = (
  showSettings: boolean,
  block: Partial<DefaultBlocksProps> & Pick<DefaultBlocksProps, "id">
) => void;

export type AddBlockProps = Pick<DefaultBlocksProps, "settings" | "type">;

type ToolbarProps = {
  addBlock: (props: AddBlockProps) => void;
  // showSettings: SettingsFunction;
  isDesktop?: boolean;
};

export function PageEditorToolbar({
  addBlock,
  isDesktop = false,
  // showSettings,
}: ToolbarProps) {
  const [open, setOpen] = useState();

  if (isDesktop) {
    return (
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-center">Add Block</CardTitle>
          <CardDescription>
            Add any number of blocks to your custom page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BlocksButton addBlock={addBlock} />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full bg-white text-white p-2 rounded shadow-md flex justify-between">
      <Button className="bg-gray-200 text-gray-600">
        <Eye />
      </Button>

      <Sheet>
        <SheetTrigger asChild>
          <Button className="bg-gray-200 text-gray-600">Add Block</Button>
        </SheetTrigger>
        <SheetContent className="w-72">
          <SheetHeader>
            <SheetTitle className="text-center">Add Block</SheetTitle>
            <SheetDescription>
              Add any number of blocks to your custom page.
            </SheetDescription>
          </SheetHeader>
          <BlocksButton addBlock={addBlock} />
        </SheetContent>
      </Sheet>

      <Button className="bg-gray-200 text-gray-600">
        <Settings className="w-5 h-5" />
      </Button>
    </div>
  );
}

type BlocksButtonProps = { addBlock: (props: AddBlockProps) => void };

function BlocksButton({ addBlock }: BlocksButtonProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-6 md:mt-0">
      {Object.entries(Blocks).map(([type, block]) => {
        const onClick = () => {
          addBlock({
            type,
            settings: [],
          });
        };

        return <Button onClick={onClick}>{type}</Button>;
      })}
    </div>
  );
}
