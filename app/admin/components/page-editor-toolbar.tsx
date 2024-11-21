import { Eye, Settings } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import Button from "~/components/button";
import { Blocks, DefaultBlocksProps } from "~/core/blocks/block";

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

type ToolbarProps = {
  addBlock: (blockMeta: DefaultBlocksProps) => void;
  showSettings: Dispatch<SetStateAction<boolean>>;
  isDesktop?: boolean;
};

export function PageEditorToolbar({
  addBlock,
  isDesktop = false,
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
        <CardContent>{renderBlocksButton()}</CardContent>
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
          {renderBlocksButton()}
        </SheetContent>
      </Sheet>

      <Button className="bg-gray-200 text-gray-600">
        <Settings className="w-5 h-5" />
      </Button>
    </div>
  );
}

function renderBlocksButton() {
  return (
    <div className="grid grid-cols-3 gap-4 mt-6 md:mt-0">
      {Object.entries(Blocks).map(([key, block]) => {
        const Tag = block;

        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button key={key} className="bg-transparent border shadow-none">
                <span className="capitalize">{key}</span>
              </Button>
            </DialogTrigger>

            <DialogContent>
              {/* <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader> */}
              <Tag />
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
}
const items: Menu[] = [
  {
    id: "home",
    label: "Home",
    path: "/administration",
    // icon: "lucide-Home",
  },
  {
    id: "page",
    label: "Page",
    path: "pages",
    // icon: "lucide-PanelLeft",
  },
  {
    id: "settings",
    label: "Settings",
    path: "settings",
    // icon: "lucide-Settings",
  },
];
