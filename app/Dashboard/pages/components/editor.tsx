import { json, useFetcher, useSubmit } from "@remix-run/react";
import { useTextEditor } from "./text";
import { BlockEditorKey, BlockProps } from "./block";
import { Switch } from "~/Shared/components/switch";
import { Label } from "~/Shared/components/label";
import { Input } from "~/Shared/components/input";
import { Slider } from "~/Shared/components/slider";
import React, { ChangeEvent } from "react";
import { Divider } from "~/Shared/components/divider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/Shared/components/popover";
import Button from "~/Shared/components/button";
import {
  HexAlphaColorPicker,
  HexColorInput,
  HexColorPicker,
} from "react-colorful";
import { colors as presetColors } from "../data/colors";
import { useLinkEditor } from "./link";
import { useSectionEditor } from "./section";
import { SheetClose } from "~/Shared/components/sheet";

export type EditorType = Omit<BlockProps, "id" | "type"> & {
  contentEditor: React.ReactElement;
  designEditor?: React.ReactElement;
  settingsEditor?: React.ReactElement;
};

export const Editors: Record<BlockEditorKey, (attrs: any) => EditorType> = {
  //Avatar: Avatar,
  Link: useLinkEditor,
  //img: "img",
  Text: useTextEditor,
  //ImageGallery: Mansory,
  Section: useSectionEditor,
} as const;

export default function Editor({ id, type, ...attrs }: BlockProps) {
  const editor = Editors[type];

  const { contentEditor, settingsEditor, props } = editor(attrs);

  const { view: spacingView, paddingTop, paddingBottom } = useSpacing();

  const {
    view: backgroundView,
    color: backgroundColor,
    imageUrl: backgroundImageUrl,
  } = useBackground();

  const [hide, setHide] = React.useState<boolean>(attrs.setting.hide ?? false);
  const [blockName, setBlockName] = React.useState<string | undefined>(
    attrs.setting.blockName
  );

  const submit = useSubmit();
  const saveEdits = () => {
    var blockProps: BlockProps = {
      id,
      type,
      ...attrs,
      props,
      spacing: {
        paddingBottom,
        paddingTop,
      },
      setting: {
        blockName,
        hide,
      },
    };

    //  submit(blockProps, { action: "", method: "post" });
    alert(JSON.stringify(blockProps, null, 2));
  };

  return (
    <div className="flex flex-col my-8">
      <div className="divide-y">
        {/** Content editor */}
        <div className="my-8">
          <h3 className="text-xl font-bold tracking-wider uppercase text-slate-400 my-8 sm:text-4xl">
            Content
          </h3>

          <div>{contentEditor}</div>
        </div>

        <div className="my-8">
          <h3 className="text-xl font-bold tracking-wider uppercase text-slate-400 my-8 sm:text-4xl">
            Settings
          </h3>

          <div className="my-8">
            {settingsEditor && settingsEditor}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="hide-block">Hide Block</Label>
                <Switch
                  id="hide-block"
                  checked={hide}
                  onCheckedChange={setHide}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <Label
                  htmlFor="block-name-input"
                  aria-describedby="block-name-descriptor"
                >
                  Block name
                </Label>
                <p
                  id="block-name-descriptor"
                  className=" text-sm tracking-tight leading-7  text-gray-500 dark:text-gray-400 "
                >
                  The optional name of the block used to search block
                  internally, create a link to it from another block.
                </p>
                <Input
                  id="block-name-input"
                  name="block-name"
                  value={blockName}
                  onInput={(e) =>
                    setBlockName((e.target as HTMLTextAreaElement).value)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-4 my-8">
          <h3 className="text-xl font-bold tracking-wider uppercase text-slate-400 my-4 sm:text-4xl">
            Block
          </h3>
          <div className="flex flex-col space-y-4">
            <h4 className="text-md font-bold tracking-tight uppercase text-slate-600 mb-2 sm:text-2xl">
              Spacing
            </h4>
            {spacingView}
          </div>
          <Divider align="center" />
          <div className="flex flex-col space-y-4">
            <h4 className="text-md font-bold tracking-tight uppercase text-slate-600 mb-2 sm:text-2xl">
              Background
            </h4>
            {backgroundView}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 ">
        <SheetClose asChild>
          <Button variant="outline" radius="md" onClick={saveEdits}>
            Save changes
          </Button>
        </SheetClose>

        <SheetClose asChild>
          <Button variant="outline" radius="md" className="bg-red-400">
            Cancel
          </Button>
        </SheetClose>
      </div>
    </div>
  );
}

function useSpacing() {
  const [paddingTop, setPaddingTop] = React.useState<number[]>([16]);
  const [paddingBottom, setPaddingBottom] = React.useState<number[]>([16]);

  const view = (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center gap-x-4">
        <Label htmlFor="padding-top" className="w-2/6">
          Top padding:
        </Label>
        <div className="flex items-center gap-1 w-2/6">
          <Input
            id="padding-top"
            type="number"
            max={50}
            min={0}
            value={paddingTop[0]}
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              setPaddingTop([+e.currentTarget.value])
            }
          />
          px
        </div>
        <Slider
          value={paddingTop}
          onValueChange={setPaddingTop}
          max={50}
          step={1}
          className="w-2/6"
        />
      </div>

      <div className="flex items-center gap-x-4">
        <Label htmlFor="padding-bottom" className="w-2/6">
          Bottom padding:
        </Label>
        <div className="flex items-center gap-1 w-2/6">
          <Input
            id="padding-bottom"
            type="number"
            max={50}
            min={0}
            value={paddingBottom[0]}
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              setPaddingBottom([+e.currentTarget.value])
            }
          />
          px
        </div>
        <Slider
          value={paddingBottom}
          onValueChange={setPaddingBottom}
          max={50}
          step={1}
          className="w-2/6"
        />
      </div>
    </div>
  );

  return {
    view,
    paddingTop: paddingTop[0],
    paddingBottom: paddingBottom[0],
  };
}

type BackgroundType = {
  view: React.ReactElement;
  color: string;
  imageUrl: string;
};

function useBackground(): BackgroundType {
  const [color, setColor] = React.useState<string>("#ffffff");
  const [imageUrl, setImageUrl] = React.useState<string>("");

  const view = (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between gap-x-4 ">
        <Label htmlFor="background-color">Color:</Label>
        <Popover>
          <PopoverTrigger>
            <div
              className="border h-10 w-16"
              style={{ backgroundColor: color }}
            />
          </PopoverTrigger>
          <PopoverContent className="flex flex-col divide-x">
            <div>
              <HexAlphaColorPicker color={color} onChange={setColor} />
              <HexColorInput color={color} onChange={setColor} prefixed />
              <div className="flex w-full flex-wrap">
                {presetColors.map((presetColor) => (
                  <button
                    key={presetColor}
                    className="min-h-5 min-w-5"
                    style={{ background: presetColor }}
                    onClick={() => setColor(presetColor)}
                  />
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="items-center gap-x-4 hidden">
        <Label htmlFor="padding">Image:</Label>
      </div>
    </div>
  );

  return {
    view,
    color,
    imageUrl,
  };
}
