// import { useEffect, useState } from "react";
// import {
//   closestCenter,
//   DndContext,
//   DragEndEvent,
//   DragOverlay,
//   DragStartEvent,
//   KeyboardSensor,
//   MouseSensor,
//   TouchSensor,
//   useDroppable,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import {
//   AddBlockProps,
//   PageEditorToolbar,
// } from "../components/page-editor-toolbar";
// import {
//   componentsMap,
//   BlockType,
//   DefaultBlocksProps,
//   JSONDefaultBlocksProps,
//   SettingsSection,
// } from "~/core/blocks/block";
// import { Item, Sortable } from "~/components/ui/sortable";
// import render from "~/components/ui/render";
// import { useMediaQuery } from "~/hooks/use-media-query";
// import { getNanoid } from "~/core/utils/util";
// import { useLoaderData, useSearchParams } from "@remix-run/react";
// import { json, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
// import { Dialog, DialogContent, DialogTrigger } from "~/components/dialog";
// import Button from "~/components/button";

// const SETTINGS_DIALOG = "settingsId";
// export const handle = {
//   pageName: "Edit Page",
//   breadcrumb: {
//     id: "edit-page",
//     label: "Edit Page",
//   },
// };

// const sampleBlockMeta: JSONDefaultBlocksProps[] = [
//   {
//     id: "1",
//     type: "text",
//     settings: [
//       {
//         title: "Text",
//         fields: [{ name: "content", value: "First Text" }],
//       },
//       {
//         title: "styles",
//         fields: [
//           { name: "Font Size", value: "16px" },
//           { name: "Font Color", value: "#000000" },
//         ],
//       },
//     ],
//     mode: "render",
//   },
//   {
//     id: "2",
//     type: "text",
//     settings: [
//       {
//         title: "Text",
//         fields: [{ name: "content", value: "Second Text" }],
//       },
//       {
//         title: "styles",
//         fields: [
//           { name: "Font Size", value: "16px" },
//           { name: "Font Color", value: "#000000" },
//         ],
//       },
//     ],
//     mode: "render",
//   },
// ];
// type LoaderDataType = {
//   blocks: JSONDefaultBlocksProps[];
// };
// export const loader = ({}: LoaderFunctionArgs) => {
//   return json<LoaderDataType>({ blocks: sampleBlockMeta });
// };

// export default function PageEditor() {
//   const { blocks } = useLoaderData() as LoaderDataType;
//   const [sortedBlocks, setSortedBlocks] =
//     useState<JSONDefaultBlocksProps[]>(blocks);
//   const [editBlock, setEditBlock] = useState<JSONDefaultBlocksProps>();

//   const [draggingBlock, setDraggingBlock] =
//     useState<JSONDefaultBlocksProps | null>(null);

//   // Hook to determine mediaQuery Used to determine if the current screen is dessktop
//   const isDesktop = useMediaQuery("(min-width: 768px)");

//   // Droppable setup for the maineditor area
//   const { setNodeRef } = useDroppable({ id: "editor-dopzone" });
//   const sensors = useSensors(
//     useSensor(MouseSensor, {
//       activationConstraint: { distance: 5 },
//     }),
//     useSensor(TouchSensor, {
//       activationConstraint: { distance: 5 },
//     }),
//     useSensor(KeyboardSensor)
//   );

//   const [searchParams, setSearchParams] = useSearchParams();
//   const activeSettingsId = searchParams.get(SETTINGS_DIALOG);

//   useEffect(() => {
//     if (activeSettingsId) {
//       setEditBlock(sortedBlocks.find((block) => block.id === activeSettingsId));
//     }
//   }, [activeSettingsId]);

//   function addBlock({ type, settings }: AddBlockProps) {
//     const id = getNanoid();

//     const newBlock: JSONDefaultBlocksProps = {
//       id,
//       type,
//       settings,
//       mode: "render",
//     };

//     setSortedBlocks([...sortedBlocks, newBlock]);
//     setSearchParams((prev) => {
//       prev.set(SETTINGS_DIALOG, newBlock.id);

//       return prev;
//     });
//   }

//   function updateBlock(id: number | string, settings: SettingsSection[]) {
//     setSortedBlocks(
//       blocks.map((block) =>
//         block.id === id ? { ...block, settings: settings } : block
//       )
//     );
//   }

//   function handleDragStart(event: DragStartEvent): void {
//     const block =
//       sortedBlocks.find((block) => block.id === event.active.id.toString()) ||
//       null;
//     setDraggingBlock(block);
//   }

//   function handleDragEnd(event: DragEndEvent): void {
//     const { active, over } = event;

//     setDraggingBlock(null);

//     if (active.id !== over?.id) {
//       setSortedBlocks((blocks) => {
//         const oldIndex = blocks.findIndex((block) => block.id === active.id);
//         const newIndex = blocks.findIndex((block) => block.id === over?.id);
//         // alert(JSON.stringify({ oldIndex, newIndex }, null, 2));
//         return arrayMove(blocks, oldIndex, newIndex);
//       });
//     }
//   }

//   function handleShowSettings(isOpen: boolean, blockId?: string): void {
//     setSearchParams((prev) => {
//       if (isOpen && blockId) {
//         prev.set(SETTINGS_DIALOG, blockId);
//       }

//       if (!isOpen) {
//         prev.delete(SETTINGS_DIALOG);
//       }

//       return prev;
//     });
//   }

//   return (
//     <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
//       <div className="flex items-center gap-4">{/* template here */}</div>
//       <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-4">
//         <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
//           {/*Main content  */}
//           <div className="bg-gray-100">
//             <DndContext
//               sensors={sensors}
//               collisionDetection={closestCenter}
//               onDragStart={handleDragStart}
//               onDragEnd={handleDragEnd}
//             >
//               <SortableContext
//                 items={sortedBlocks}
//                 strategy={verticalListSortingStrategy}
//               >
//                 {/* Droppable area */}
//                 <div className="bg-white p-4 rounded shadow-md min-h-full">
//                   {sortedBlocks.map((block) => {
//                     return (
//                       <Sortable
//                         key={block.id}
//                         id={block.id}
//                         onClick={() => {
//                           setSearchParams((prev) => {
//                             prev.set(SETTINGS_DIALOG, block.id);

//                             return prev;
//                           });
//                         }}
//                       >
//                         {render(componentsMap[block.type as BlockType], {
//                           mode: "render",
//                           settings: block.settings,
//                         })}
//                       </Sortable>
//                     );
//                   })}
//                 </div>
//               </SortableContext>
//               <DragOverlay>
//                 {draggingBlock && (
//                   <Item
//                     id={draggingBlock.id}
//                     ref={setNodeRef}
//                     className="rounded-sm bg-gray-200"
//                   >
//                     {render(componentsMap[draggingBlock.type as BlockType], {
//                       mode: "render",
//                       settings: draggingBlock.settings,
//                     })}
//                   </Item>
//                 )}
//               </DragOverlay>
//             </DndContext>
//           </div>
//         </div>
//         <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
//           {/* Page sidebar */}
//           {isDesktop && (
//             <PageEditorToolbar isDesktop showHintForComponent={addBlock} />
//           )}
//         </div>
//       </div>
//       <div className="fixed w-full left-0 right-0 bottom-0 flex items-center justify-center gap-2 md:hidden">
//         {/* mobile only toolbar here */}
//         {!isDesktop && (
//           <PageEditorToolbar
//             isDesktop={false}
//             showHintForComponent={addBlock}
//           />
//         )}
//       </div>
//       <Dialog open={!!activeSettingsId} onOpenChange={handleShowSettings}>
//         <DialogContent>
//           <div className="">
//             <h4>Block settings</h4>
//             {editBlock &&
//               render(componentsMap[editBlock.type as BlockType], {
//                 ...editBlock,
//                 mode: "editor",
//               })}
//             {/* <button onClick={() => setDialogOpen(false)}>Close</button> */}
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
