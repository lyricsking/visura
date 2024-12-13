import {
  Stack,
  SegmentedControl,
  Divider,
  ColorInput,
  Slider,
  NativeSelect,
  Text,
  Title,
  TitleProps,
  Textarea,
} from "@mantine/core";
import {
  ComponentsInfo,
  BaseComponentsInfoProps,
} from "../types/builder.components";

export type MantineTitleSettingsProps = ComponentsInfo<
  BaseComponentsInfoProps & TitleProps
>;

export const titleInfo: MantineTitleSettingsProps = {
  name: "title",
  group: "display",
  component: Title,
  settingsComponent: MantineTitleSetting,
  props: {
    c: "#474747",
    order: 3,
    lineClamp: 0,
    ta: "center",
    my: 0,
    mx: 0,
    children: "Example text",
    onPropsUpdate: () => {},
  },
};

const content =
  '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

export function MantineTitleSetting(props: MantineTitleSettingsProps["props"]) {
  const { id, c, children, lineClamp, order, mt, mb, mx, ta, onPropsUpdate } =
    props;

  return (
    <Stack>
      <NativeSelect
        label="Title type"
        description="Specify the text size"
        defaultValue={order}
        onChange={(event: any) =>
          onPropsUpdate(id!, "order", Number(event.currentTarget.value))
        }
        data={[
          { label: "H1", value: "1" },
          { label: "H2", value: "2" },
          { label: "H3", value: "3" },
          { label: "H4", value: "4" },
          { label: "H5", value: "5" },
          { label: "H6", value: "6" },
        ]}
      />

      <Divider />

      {/* <MantineRichTextEditor
        value={content}
        onChange={(value) => 
          onPropsUpdate(id!, "children", value);
        }
      /> */}

      <Textarea
        label="Title text"
        description="Enter title text below"
        placeholder="Title"
        defaultValue={String(children)}
        onChange={(event) =>
          onPropsUpdate(id!, "children", event.currentTarget.value)
        }
      />

      <Divider />

      <div>
        <Text size="sm" fw={500} mb={3}>
          Text Alignment
        </Text>
        <SegmentedControl
          defaultValue={ta as string}
          onChange={(value: any) => onPropsUpdate(id!, "ta", value)}
          data={[
            { label: "Start", value: "start" },
            { label: "Center", value: "center" },
            { label: "End", value: "end" },
            { label: "Justify", value: "justify" },
          ]}
        />
      </div>

      <ColorInput
        defaultValue={c as string}
        onChange={(value: any) => onPropsUpdate(id!, "c", value)}
        label="Text color"
        description="Pick a text color, Click the picker icon on the right to pick from anywhere in the screen"
      />

      <div>
        <Text size="sm" fw={500}>
          Top Spacing
        </Text>
        <Slider
          defaultValue={Number(mt)}
          step={1}
          min={0}
          max={100}
          onChange={(value: number) => onPropsUpdate(id!, "mt", value)}
          styles={{ markLabel: { display: "none" } }}
        />
      </div>

      <div>
        <Text size="sm" fw={500}>
          Bottom Spacing
        </Text>
        <Slider
          defaultValue={Number(mb)}
          step={1}
          min={0}
          max={100}
          onChange={(value: number) => onPropsUpdate(id!, "mb", value)}
          styles={{ markLabel: { display: "none" } }}
        />
      </div>

      <div>
        <Text size="sm" fw={500}>
          Horizontal Spacing
        </Text>
        <Slider
          defaultValue={Number(mx)}
          step={1}
          min={0}
          max={40}
          onChange={(value: number) => onPropsUpdate(id!, "mx", value)}
          styles={{ markLabel: { display: "none" } }}
        />
      </div>

      <Divider />

      <NativeSelect
        label="Line Clamp"
        description="Specify the number of lines after which Text will be truncated"
        defaultValue={lineClamp}
        onChange={(event: any) =>
          onPropsUpdate(id!, "lineClamp", Number(event.currentTarget.value))
        }
        data={["none", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
      />
    </Stack>
  );
}
