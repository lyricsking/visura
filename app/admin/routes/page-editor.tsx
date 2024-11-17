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
import {
  baseSettings,
  Blocks,
  BlockType,
  DefaultBlocksProps,
  SettingsSection,
} from "~/core/blocks/block";
import { Sortable } from "~/components/ui/sortable";
import { Item } from "~/components/ui/item";
import render from "~/components/ui/render";
import { Grip } from "lucide-react";
import { BlockSettingSidebar } from "~/core/blocks/block-settings-sidebar";
import { SidebarProvider } from "~/components/sidebar";

export const handle = {
  pageName: "Edit Page",
  breadcrumb: {
    id: "edit-page",
    label: "Edit Page",
  },
};

const sampleBlockMeta: DefaultBlocksProps[] = [
  {
    id: "1",
    type: "text",
    settings: [
      {
        title: "Text",
        fields: [{ name: "content", value: "First Text" }],
      },
      {
        title: "styles",
        fields: [
          { name: "Font Size", value: "16px" },
          { name: "Font Color", value: "#000000" },
        ],
      },
    ],
    mode: "render",
    onSettingsUpdate: function (updatedSettings: SettingsSection[]): void {},
  },
  {
    id: "2",
    type: "text",
    settings: [
      {
        title: "Text",
        fields: [{ name: "content", value: "Second Text" }],
      },
      {
        title: "styles",
        fields: [
          { name: "Font Size", value: "16px" },
          { name: "Font Color", value: "#000000" },
        ],
      },
    ],
    mode: "render",
    onSettingsUpdate: function (updatedSettings: SettingsSection[]): void {},
  },
];

export default function PageEditor() {
  const [blocks, setBlocks] = useState<DefaultBlocksProps[]>(sampleBlockMeta);
  // const [activeId, setActiveId] = useState<string | null>(null);
  const [activeBlock, setActiveBlock] = useState<DefaultBlocksProps | null>(
    null
  );
  const [open, setOpen] = useState(true);

  // Droppable setup for the maineditor area
  const { setNodeRef } = useDroppable({ id: "editor-dopzone" });
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const addBlock = ({ id, type, settings }: DefaultBlocksProps) => {
    setBlocks([
      ...blocks,
      {
        id,
        type,
        settings,
        mode: "render",
        onSettingsUpdate: () => updateBlock(id, settings),
      },
    ]);
  };

  const updateBlock = (id: number | string, settings: SettingsSection[]) => {
    setBlocks(
      blocks.map((block) =>
        block.id === id ? { ...block, settings: settings } : block
      )
    );
  };

  function handleDragStart(event: DragStartEvent): void {
    // setActiveId(event.active.id.toString());
    setActiveBlock(
      blocks.find((block) => block.id === event.active.id.toString()) || null
    );
  }

  function handleDragEnd(event: DragEndEvent): void {
    const { active, over } = event;
    // setActiveId(null);
    setActiveBlock(null);

    if (active.id !== over?.id) {
      setBlocks((blocks) => {
        const oldIndex = blocks.findIndex((block) => block.id === active.id);
        const newIndex = blocks.findIndex((block) => block.id === over?.id);

        return arrayMove(blocks, oldIndex, newIndex);
      });
    }
  }

  return (
    <SidebarProvider
      id="block-sidebar-provider"
      open={open}
      onOpenChange={setOpen}
    >
      {/* Right sidebar context here */}
      <BlockSettingSidebar />
      <div className="relative container mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
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
                {blocks.map((block) => (
                  <Sortable key={block.id} id={block.id}>
                    {render(Blocks[block.type as BlockType], {
                      settings: block.settings,
                      mode: "editor",
                      onSettingsUpdate: updateBlock,
                    })}
                  </Sortable>
                ))}
              </div>
            </SortableContext>
            <DragOverlay>
              {activeBlock ? (
                <Item
                  id={activeBlock.id}
                  ref={setNodeRef}
                  className="rounded-sm bg-gray-200"
                >
                  {" "}
                  {render(Blocks[activeBlock.type as BlockType], {
                    settings: activeBlock.settings,
                  })}
                </Item>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
        {/* Bottom toolbar */}
        <div className="fixed w-full left-0 right-0 bottom-0 md:hidden">
          <PageEditorToolbar addBlock={addBlock} showSettings={setOpen} />
        </div>
      </div>
    </SidebarProvider>
  );
}
