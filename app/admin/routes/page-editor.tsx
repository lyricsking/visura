import { useState } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PageEditorToolbar } from "../components/page-editor-toolbar";
import { TextBlock } from "~/core/blocks/text";
import { BlockMetadata } from "~/core/blocks/block";
import { Sortable } from "~/components/ui/sortable";
import { Item } from "~/components/ui/item";
import renderBlock from "~/components/ui/block";

export const handle = {
  pageName: "Edit Page",
  breadcrumb: {
    id: "edit-page",
    label: "Edit Page",
  },
};

const sampleBlockMeta: BlockMetadata[] = [
  {
    id: "1",
    type: "text",
    props: { content: "First block" },
    blocks: [],
  },
  {
    id: "2",
    type: "text",
    props: { content: "Second block" },
    blocks: [],
  },
];

export default function PageEditor() {
  const [blocks, setBlocks] = useState<BlockMetadata[]>(sampleBlockMeta);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);

  // Droppable setup for the maineditor area
  const { setNodeRef } = useDroppable({ id: "editor-dopzone" });
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

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

  function handleDragStart(event: DragStartEvent): void {
    setActiveId(event.active.id.toString());
  }

  function handleDragEnd(event: DragEndEvent): void {
    const { active, over } = event;
    setActiveId(null);

    if (active.id !== over?.id) {
      setBlocks((blocks) => {
        const oldIndex = blocks.findIndex((block) => block.id === active.id);
        const newIndex = blocks.findIndex((block) => block.id === over?.id);

        return arrayMove(blocks, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="relative container mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
      {/* Right sidebar context here */}

      <div className="bg-gray-100">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={blocks}
            strategy={verticalListSortingStrategy}
          >
            {/* Droppable area */}
            <div className="bg-white p-4 rounded shadow-md min-h-full">
              {blocks.map((block: any) => (
                <Sortable key={block.id} id={block.id}>
                  {block.type === "text" ? <TextBlock {...block} /> : null}
                </Sortable>
              ))}
            </div>
          </SortableContext>
          <DragOverlay>
            {activeId ? (
              <Item
                id={activeId}
                ref={setNodeRef}
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  marginBottom: "8px",
                  backgroundColor: "#f0f0f0",
                }}
              >
                {renderBlock(blocks.find((block) => block.id === activeId)!)}
              </Item>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Bottom toolbar */}
      <div className="sticky w-full bottom-0">
        <PageEditorToolbar addBlock={addBlock} />
      </div>
    </div>
  );
}
