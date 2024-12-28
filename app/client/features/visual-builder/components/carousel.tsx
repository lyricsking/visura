import {
  Text,
  Stack,
  SegmentedControl,
  Slider,
  NativeSelect,
  Switch,
  Image,
  TextInput,
  NumberInput,
  Divider,
} from "@mantine/core";
import {
  Carousel as MantineCarousel,
  CarouselProps as MantineCarouselProps,
} from "@mantine/carousel";
import {
  ComponentsInfo,
  BaseComponentsInfoProps,
} from "../../../../shared/types/builder.components";
import { useVisualBuilder } from "./visual-builder.provider";
import { slideSizeMarks, marks } from "../utils/marks";

type CarouselProps = MantineCarouselProps & {
  slides: {
    id: string;
    imageUrl: string;
  }[];
};

type CarouselSettingsProps = ComponentsInfo<
  CarouselProps & BaseComponentsInfoProps
>;

export const carouselInfo: CarouselSettingsProps = {
  name: "carousel",
  group: "misc",
  component: Carousel,
  settingsComponent: CarouselSetting,
  props: {
    onPropsUpdate: () => {},
    align: "start",
    orientation: "horizontal",
    slideSize: "70%",
    slideGap: "0",
    controlsOffset: "xs",
    controlSize: "14",
    height: "auto",
    loop: true,
    draggable: true,
    dragFree: false,
    withControls: true,
    withIndicators: false,
    slides: [
      {
        id: "1",
        imageUrl:
          "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png",
      },
      {
        id: "2",
        imageUrl:
          "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png",
      },
      {
        id: "3",
        imageUrl:
          "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png",
      },
    ],
  },
};

export function Carousel(props: CarouselProps) {
  const { slides, ...attrs } = props;

  return (
    <MantineCarousel {...attrs}>
      {slides.map((slide) => (
        <MantineCarousel.Slide key={slide.id}>
          <Image h={"100%"} src={slide.imageUrl} />
        </MantineCarousel.Slide>
      ))}
    </MantineCarousel>
  );
}

export function CarouselSetting({ ...props }: CarouselSettingsProps["props"]) {
  const {
    id,
    align,
    controlsOffset,
    controlSize,
    dragFree,
    draggable,
    height,
    loop,
    my,
    mx,
    orientation,
    slideSize,
    slideGap,
    withControls,
    withIndicators,
    onPropsUpdate,
  } = props;

  return (
    <Stack mb={35}>
      <div>
        <Text id="label-position-description" size="sm" fw={500} mb={3}>
          Align
        </Text>
        <SegmentedControl
          aria-describedby="label-position-description"
          defaultValue={align as string}
          onChange={(value: string) => onPropsUpdate(id!, "align", value)}
          data={[
            { label: "Start", value: "start" },
            { label: "Center", value: "center" },
            { label: "End", value: "end" },
          ]}
        />
      </div>

      <div>
        <Text size="sm" fw={500} mb={3}>
          Orientation
        </Text>
        <SegmentedControl
          defaultValue={orientation}
          onChange={(value: string) => onPropsUpdate(id!, "orientation", value)}
          data={[
            { label: "Horizontal", value: "horizontal" },
            { label: "Vertical", value: "vertical" },
          ]}
        />
      </div>

      <TextInput
        label="Height"
        description="Specify image height. Could be number or string value"
        defaultValue={height as string}
        onChange={(event) =>
          onPropsUpdate(id!, "height", event.currentTarget.value)
        }
      />

      <Divider />

      <div>
        <Text size="sm" fw={500}>
          Vertical Spacing
        </Text>
        <Slider
          defaultValue={Number(my)}
          step={1}
          min={0}
          max={40}
          onChange={(value: number) => onPropsUpdate(id!, "my", value)}
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

      <div>
        <Text size="sm" fw={500}>
          Slide Size
        </Text>
        <Slider
          defaultValue={
            slideSizeMarks.find((mark) => mark.label === slideSize)!.value
          }
          label={(val) =>
            slideSizeMarks.find((mark) => mark.value === val)!.label
          }
          step={5}
          marks={slideSizeMarks}
          onChange={(value: number) => {
            onPropsUpdate(
              id!,
              "slideSize",
              slideSizeMarks.find((mark) => mark.value === value)!.label
            );
          }}
          styles={{ markLabel: { display: "none" } }}
        />
      </div>

      <div>
        <Text size="sm" fw={500}>
          Slide Gap
        </Text>
        <Slider
          defaultValue={marks.find((mark) => mark.label === slideGap)!.value}
          label={(val) => marks.find((mark) => mark.value === val)!.label}
          step={20}
          marks={marks}
          onChange={(value: number) =>
            onPropsUpdate(
              id!,
              "slideGap",
              marks.find((mark) => mark.value === value)!.label
            )
          }
          styles={{ markLabel: { display: "none" } }}
        />
      </div>

      <div>
        <Text size="sm" fw={500}>
          Control Offset
        </Text>
        <Slider
          defaultValue={
            marks.find((mark) => mark.label === controlsOffset)!.value
          }
          label={(val) => marks.find((mark) => mark.value === val)!.label}
          step={20}
          marks={marks}
          onChange={(value: number) =>
            onPropsUpdate(
              id!,
              "controlsOffset",
              marks.find((mark) => mark.value === value)!.label
            )
          }
          styles={{ markLabel: { display: "none" } }}
        />
      </div>

      <div>
        <Text size="sm" fw={500}>
          Control Size
        </Text>
        <Slider
          defaultValue={Number(controlSize)}
          step={1}
          min={14}
          max={40}
          onChange={(value: number) => onPropsUpdate(id!, "controlSize", value)}
          styles={{ markLabel: { display: "none" } }}
        />
      </div>

      <Switch
        defaultChecked={loop}
        label="Loop"
        onChange={(event) =>
          onPropsUpdate(id!, "loop", event.currentTarget.checked)
        }
      />

      <Switch
        defaultChecked={draggable}
        label="Draggable"
        onChange={(event) =>
          onPropsUpdate(id!, "draggable", event.currentTarget.checked)
        }
      />

      <Switch
        defaultChecked={dragFree}
        label="Drag Free"
        onChange={(event) =>
          onPropsUpdate(id!, "dragFree", event.currentTarget.checked)
        }
      />

      <Switch
        defaultChecked={withControls}
        label="With Controls"
        onChange={(event) =>
          onPropsUpdate(id!, "withControls", event.currentTarget.checked)
        }
      />

      <Switch
        defaultChecked={withIndicators}
        label="With Indicators"
        onChange={(event) =>
          onPropsUpdate(id!, "withIndicators", event.currentTarget.checked)
        }
      />
    </Stack>
  );
}
