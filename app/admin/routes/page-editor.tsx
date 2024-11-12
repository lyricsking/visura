import { ChevronLeft, PlusCircle, Upload } from "lucide-react";

import { Badge } from "~/components/badge";
import Button from "~/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/card";
import { Input } from "~/components/input";
import { Label } from "~/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/table";
import { Textarea } from "~/components/textarea";
import { ToggleGroup, ToggleGroupItem } from "~/components/toggle.group";
import lo from "lodash";
import { getSlug } from "~/core/utils/string";
import { useState } from "react";
import { DndContext, useDroppable } from "@dnd-kit/core";
import { PageEditorToolbar } from "../components/page-editor-toolbar";
import { TextBlock } from "~/core/blocks/text";
import { ImageBlock } from "~/core/blocks/image";
import { DraggableBlock } from "~/components/ui/draggable";
import { BlockMetadata } from "~/core/blocks/block";

export const handle = {
  pageName: "Edit Page",
  breadcrumb: {
    id: "edit-page",
    label: "Edit Page",
  },
};

export default function PageEditor() {
  const [blocks, setBlocks] = useState<BlockMetadata[]>([]);
  const [selectedBlock, setSelectedBlock] = useState(null);

  // Droppable setup for the maineditor area
  const { setNodeRef } = useDroppable({ id: "editor-dopzone" });

  const addBlock = ({ id, type, props, blocks = [] }: BlockMetadata) => {
    setBlocks([
      ...blocks,
      {
        id,
        type,
        props,
        blocks,
      },
    ]);
  };

  const updateBlock = (id: number, content: string) => {
    setBlocks(
      blocks.map((block: any) =>
        block.id === id ? { ...block, content } : block
      )
    );
  };

  return (
    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
      {/* Right sidebar context here */}
      <>
        <div className="relative bg-gray-100 p-4">
          <DndContext>
            {/* Droppable area */}
            <div
              ref={setNodeRef}
              className="bg-white p-4 rounded shadow-md min-h-full"
            >
              {blocks.map((block: any) => (
                <DraggableBlock key={block.id} id={block.id}>
                  {block.type === "text" ? (
                    <TextBlock {...block.content} />
                  ) : (
                    <ImageBlock {...block.content} />
                  )}
                </DraggableBlock>
              ))}
            </div>
          </DndContext>
        </div>

        {/* Bottom toolbar */}
        <PageEditorToolbar addBlock={addBlock} />
      </>
    </div>
  );
}
