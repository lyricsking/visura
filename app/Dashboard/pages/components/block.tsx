import Button from "~/Shared/components/button";
import React, { useState } from "react";
import Editor from "./editor";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/Shared/components/sheet";
import { Link } from "./link";
import { Text } from "./text";
import { Section } from "./section";

export type BlockEditorKey =
  //"Avatar"|
  | "Link"
  //| "img"
  | "Text"
  //| "ImageGallery"
  | "Section";

export const ElementEditors: Record<BlockEditorKey, any> = {
  //"Avatar": Avatar,
  Link: Link,
  //"img": "img",
  Text: Text,
  //"ImageGallery":  Mansory,
  Section: Section,
} as const;

export type BlockProps = {
  id: string | number;
  type: BlockEditorKey;
  spacing: {
    paddingTop: number | string;
    paddingBottom: number | string;
  };
  setting: {
    blockName?: string;
    hide?: boolean;
  };
  props: Record<string, any>;
};

export default function Block({ id, type, ...props }: BlockProps) {
  const Element = ElementEditors[type];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div>
          <Element id={id} {...props} />
        </div>
      </SheetTrigger>
      <SheetContent
        side={"bottom"}
        className="h-[100%] w-[100%] overflow-y-auto no-scrollbar"
      >
        <SheetHeader>
          <SheetTitle>{type}</SheetTitle>
          <SheetDescription className="uppercase hidden">
            {type} Editor
          </SheetDescription>
        </SheetHeader>
        <div>
          <Editor id={id} type={type} {...props} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
