import { useEffect, useState } from "react";
import {
  DragEndEvent,
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
} from "@dnd-kit/sortable";
import {
  AddBlockProps,
  PageEditorToolbar,
} from "../components/page-editor-toolbar";
import {
  JSONDefaultBlocksProps,
  SettingsSection,
} from "~/core/blocks/block";
import { useMediaQuery } from "~/hooks/use-media-query";
import { getNanoid } from "~/core/utils/util";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Dialog, DialogContent } from "~/components/dialog";
import { PageModel } from "~/core/page/models/page.server";
import CodeMirrorEditor from "~/components/editor/codemirror";

const SETTINGS_DIALOG = "settingsId";
export const handle = {
  pageName: "Edit Page",
  breadcrumb: {
    id: "edit-page",
    label: "Edit Page",
  },
};

type LoaderDataType = {
  blocks: JSONDefaultBlocksProps[];
};
export const loader = ({}: LoaderFunctionArgs) => {
  return json<LoaderDataType>({ blocks: [] });
};

export default function PageEditor() {
    const [yamlContent, setYamlContent] = useState<string>(`
sections:
  - type: hero
    props:
      title: Welcome to My Website
      subtitle: Build dynamic pages with ease
      background: /images/hero-bg.jpg
`);

    const handleSave = () => {
      // Save the YAML content to the database
      console.log("Saved YAML Content:", yamlContent);
    };

const { blocks } = useLoaderData() as LoaderDataType;
  const [sortedBlocks, setSortedBlocks] =
    useState<JSONDefaultBlocksProps[]>(blocks);
  const [editBlock, setEditBlock] = useState<JSONDefaultBlocksProps>();

  const [draggingBlock, setDraggingBlock] =
    useState<JSONDefaultBlocksProps | null>(null);

  // Hook to determine mediaQuery Used to determine if the current screen is dessktop
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Droppable setup for the maineditor area
  const { setNodeRef } = useDroppable({ id: "editor-dopzone" });
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor)
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const activeSettingsId = searchParams.get(SETTINGS_DIALOG);

  useEffect(() => {
    if (activeSettingsId) {
      setEditBlock(sortedBlocks.find((block) => block.id === activeSettingsId));
    }
  }, [activeSettingsId]);

  function addBlock({ type, settings }: AddBlockProps) {
    const id = getNanoid();

    const newBlock: JSONDefaultBlocksProps = {
      id,
      type,
      settings,
      mode: "render",
    };

    setSortedBlocks([...sortedBlocks, newBlock]);
    setSearchParams((prev) => {
      prev.set(SETTINGS_DIALOG, newBlock.id);

      return prev;
    });
  }

  function updateBlock(id: number | string, settings: SettingsSection[]) {
    setSortedBlocks(
      blocks.map((block) =>
        block.id === id ? { ...block, settings: settings } : block
      )
    );
  }

  function handleDragStart(event: DragStartEvent): void {
    const block =
      sortedBlocks.find((block) => block.id === event.active.id.toString()) ||
      null;
    setDraggingBlock(block);
  }

  function handleDragEnd(event: DragEndEvent): void {
    const { active, over } = event;

    setDraggingBlock(null);

    if (active.id !== over?.id) {
      setSortedBlocks((blocks) => {
        const oldIndex = blocks.findIndex((block) => block.id === active.id);
        const newIndex = blocks.findIndex((block) => block.id === over?.id);
        // alert(JSON.stringify({ oldIndex, newIndex }, null, 2));
        return arrayMove(blocks, oldIndex, newIndex);
      });
    }
  }

  function handleShowSettings(isOpen: boolean, blockId?: string): void {
    setSearchParams((prev) => {
      if (isOpen && blockId) {
        prev.set(SETTINGS_DIALOG, blockId);
      }

      if (!isOpen) {
        prev.delete(SETTINGS_DIALOG);
      }

      return prev;
    });
  }

  return (
    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
      <div className="flex items-center gap-4">{/* template here */}</div>
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-4">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          {/*Main content  */}
          <div className="bg-gray-100">
            <CodeMirrorEditor value={yamlContent} onChange={setYamlContent} />
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          {/* Page sidebar */}
          {isDesktop && <PageEditorToolbar isDesktop addBlock={addBlock} />}
        </div>
      </div>
      <div className="fixed w-full left-0 right-0 bottom-0 flex items-center justify-center gap-2 md:hidden">
        {/* mobile only toolbar here */}
        {!isDesktop && (
          <PageEditorToolbar isDesktop={false} addBlock={addBlock} />
        )}
      </div>
      <Dialog open={!!activeSettingsId} onOpenChange={handleShowSettings}>
        <DialogContent></DialogContent>
      </Dialog>
    </div>
  );
}