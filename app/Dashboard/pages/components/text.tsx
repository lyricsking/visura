import React from "react";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { cn } from "~/Shared/utils";
import { BlockProps } from "~/dashboard/pages/components/block";
import { EditorType } from "./editor";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/Shared/components/select";
import { FontDescriptor, fonts } from "~/Shared/data/fonts";
import {
  Bars3BottomLeftIcon,
  Bars3BottomRightIcon,
  Bars3CenterLeftIcon,
  Bars3Icon,
  ChevronDownIcon,
} from "@heroicons/react/16/solid";
import {
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons";
import Button from "~/Shared/components/button";
import { Textarea } from "~/Shared/components/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/Shared/components/popover";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { colors as presetColors } from "../data/colors";
import { twMerge } from "tailwind-merge";
import { ToggleGroup, ToggleGroupItem } from "~/Shared/components/toggle.group";
import { Toggle } from "~/Shared/components/toggle";
import { Label } from "~/Shared/components/label";

const alignments = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
  justify: "text-justify",
};

const sizes = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
};

const textVariant = cva("", {
  variants: {
    alignment: alignments,
    size: sizes,
  },
  defaultVariants: {
    alignment: "left",
    size: "md",
  },
});
type TextVariant = VariantProps<typeof textVariant>;

export const TextType = {
  text: "text",
  h1: "h1",
  h2: "h2",
  h3: "h3",
} as const;
export type TextType = keyof typeof TextType;

export interface TextAttrs
  extends React.ComponentPropsWithoutRef<"p">,
    TextVariant {
  textType: TextType;
  font: FontDescriptor;
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  color?: React.CSSProperties["color"];
  background?:
    | React.CSSProperties["backgroundColor"]
    | React.CSSProperties["backgroundImage"];
}

export type TextBlockProp = Omit<BlockProps, "type"> & {
  props: TextAttrs;
};

export function Text({
  setting: { blockName, hide },
  props: { children, className, size, textType: Tag },
}: TextBlockProp) {
  var computedClass = cn(textVariant({ size }), className, hide && "hidden");

  return Tag === TextType.text ? (
    <p id={blockName} className={computedClass}>
      {children}
    </p>
  ) : (
    <Tag id={blockName} className={computedClass}>
      {children}
    </Tag>
  );
}

export type TextEditorType = Omit<
  EditorType,
  "designEditor" | "settingsEditor"
> & {
  props: TextAttrs;
};

export function useTextEditor(textBlockProps: TextBlockProp): TextEditorType {
  const {
    textType: pTextType = "text",
    alignment: pAlignment,
    bold: pBold = false,
    font: pFont,
    italic: pItalic = false,
    strikethrough: pStrikethrough = false,
    underline: pUnderline = false,
    size: pSize,
  } = textBlockProps.props;

  const [size, setSize] = React.useState<TextVariant["size"]>(pSize);

  const [font, setFont] = React.useState<FontDescriptor>(pFont ?? fonts[0]);
  const setFontByName = (name: string) => {
    const font = fonts.find((font) => font.name === name);
    setFont(font ?? fonts[0]);
  };
  const [alignment, setAlignment] =
    React.useState<TextVariant["alignment"]>(pAlignment);

  const [bold, setBold] = React.useState<boolean>(pBold);

  const [italic, setItalic] = React.useState<boolean>(pItalic);

  const [strikethrough, setStrikethrough] =
    React.useState<boolean>(pStrikethrough);

  const [underline, setUnderline] = React.useState<boolean>(pUnderline);

  const [color, setColor] = React.useState<string>("#262626");

  const [textType, setTextType] = React.useState<TextType>(pTextType);

  const [text, setText] = React.useState<string>("");

  const contentEditor: React.ReactElement = (
    <div className="flex flex-col bg-white w-full">
      <div className="flex border divide-x max-w-full overflow-x-auto no-scrollbar">
        {/** Text tag type e.g p, h1, h2 h3 */}
        <div className="flex-none">
          <Select
            value={textType}
            onValueChange={(value) => setTextType(value as TextType)}
          >
            <SelectTrigger className="border-none">
              <SelectValue placeholder="Select Text type" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {Object.keys(TextType).map((textType) => (
                <SelectItem key={textType} value={textType}>
                  {textType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/** Text font size */}
        <div className="flex-none">
          <Select
            value={size!}
            onValueChange={(value) =>
              setSize(value as keyof TextVariant["size"])
            }
          >
            <SelectTrigger className=" border-none" value={size!}>
              <SelectValue placeholder="Font Size" />
            </SelectTrigger>

            <SelectContent className="bg-white">
              {Object.keys(sizes).map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/** Text font */}
        <div className="flex-none">
          <Select
            value={font.name}
            onValueChange={(fontName) => setFontByName(fontName)}
          >
            <SelectTrigger
              className="border-none"
              value={font.name}
              style={{ fontFamily: font.value }}
            >
              <SelectValue placeholder="Aa" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {fonts.map((font) => (
                <SelectItem
                  value={font.name}
                  style={{ fontFamily: font.value }}
                >
                  {font.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/** Text decoration Selector */}
        <div className="flex-none">
          <Toggle
            size={"lg"}
            pressed={bold}
            onPressedChange={setBold}
            aria-label="Toggle bold"
          >
            <FontBoldIcon className="h-5 w-5" />
          </Toggle>
          <Toggle
            size={"lg"}
            pressed={italic}
            onPressedChange={setItalic}
            aria-label="Toggle italic"
          >
            <FontItalicIcon className=" h-5 w-5" />
          </Toggle>
          <Toggle
            size={"lg"}
            pressed={strikethrough}
            onPressedChange={setStrikethrough}
            aria-label="Toggle strikethrough"
          >
            <StrikethroughIcon className="h-5 w-5" />
          </Toggle>
          <Toggle
            size={"lg"}
            pressed={underline}
            onPressedChange={setUnderline}
            aria-label="Toggle underline"
          >
            <UnderlineIcon className="h-5 w-5" />
          </Toggle>
        </div>

        {/** Text Alignment Selector */}
        <div className="flex-none">
          <ToggleGroup
            type="single"
            value={alignment!}
            onValueChange={(alignment) =>
              setAlignment(alignment as keyof TextVariant["alignment"])
            }
          >
            <ToggleGroupItem size={"lg"} value="left" aria-label="Toggle left">
              <Bars3BottomLeftIcon className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              size={"lg"}
              value="center"
              aria-label="Toggle center"
            >
              <Bars3Icon className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              size={"lg"}
              value="right"
              aria-label="Toggle right"
            >
              <Bars3BottomRightIcon className="h-5 w-5" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/** Text color Selector */}
        <div className="flex-none">
          <Popover>
            <PopoverTrigger>
              <Button className="font-bold" style={{ color: color }}>
                Aa
                <ChevronDownIcon className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col divide-x bg-white">
              <div>
                <HexColorPicker color={color} onChange={setColor} />
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
      </div>

      {/** Text Textarea */}
      <div className="flex flex-col items-center justify-center">
        <Textarea
          className={twMerge(
            textVariant({ alignment, size }),
            "border-t-0 border-x rounded-none h-52 w-full",
            bold && "font-bold",
            italic && "italic",
            strikethrough && "line-through",
            underline && "underline"
          )}
          style={{
            fontFamily: font.value,
            color: color,
          }}
          placeholder="Enter text..."
          value={text}
          onInput={(e) => setText((e.target as HTMLTextAreaElement).value)}
        />
      </div>
    </div>
  );

  const settings = <></>;

  return {
    ...textBlockProps,
    contentEditor,
    props: {
      ...textBlockProps.props,
      alignment,
      bold,
      color,
      font,
      italic,
      size,
      strikethrough,
      text,
      textType,
      underline,
    },
  };
}
