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
} from "@mantine/core";
import {
  Carousel as MantineCarousel,
  CarouselProps as MantineCarouselProps,
} from "@mantine/carousel";
import {
  ComponentsInfo,
  BaseComponentsInfoProps,
} from "../types/builder.components";
import { useVisualBuilder } from "./visual-builder.provider";

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
    align: "start",
    orientation: "horizontal",
    slideSize: "70%",
    slideGap: "0",
    controlsOffset: "xs",
    controlSize: "14",
    height: "auto",
    loop: false,
    draggable: true,
    dragFree: false,
    withControls: true,
    withIndicators: true,
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

const marks = [
  { value: 0, label: "0" },
  { value: 20, label: "xs" },
  { value: 40, label: "sm" },
  { value: 60, label: "md" },
  { value: 80, label: "lg" },
  { value: 100, label: "xl" },
];

const slideSizeMarks = [
  { value: 0, label: "0%" },
  { value: 5, label: "5%" },
  { value: 10, label: "10%" },
  { value: 15, label: "15%" },
  { value: 20, label: "20%" },
  { value: 25, label: "25%" },
  { value: 30, label: "30%" },
  { value: 35, label: "35%" },
  { value: 40, label: "40%" },
  { value: 45, label: "45%" },
  { value: 50, label: "50%" },
  { value: 55, label: "55%" },
  { value: 60, label: "60%" },
  { value: 65, label: "65%" },
  { value: 70, label: "70%" },
  { value: 75, label: "75%" },
  { value: 80, label: "80%" },
  { value: 85, label: "85%" },
  { value: 90, label: "90%" },
  { value: 95, label: "95%" },
  { value: 100, label: "100%" },
];

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
    orientation,
    slideSize,
    slideGap,
    withControls,
    withIndicators,
  } = props;

  const { updateComponent } = useVisualBuilder();

  return (
    <Stack mb={35}>
      <div>
        <Text id="label-position-description" size="sm" fw={500} mb={3}>
          Align
        </Text>
        <SegmentedControl
          aria-describedby="label-position-description"
          defaultValue={align as string}
          onChange={(value: string) => updateComponent(id!, "align", value)}
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
          onChange={(value: string) =>
            updateComponent(id!, "orientation", value)
          }
          data={[
            { label: "Horizontal", value: "horizontal" },
            { label: "Vertical", value: "vertical" },
          ]}
        />
      </div>

      <TextInput
        label="Gallery"
        description="Specify image height. Could be number or string value"
        defaultValue={height as string}
        onChange={(event) =>
          updateComponent(id!, "height", event.currentTarget.value)
        }
      />

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
            updateComponent(
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
            updateComponent(
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
            updateComponent(
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
          onChange={(value: number) =>
            updateComponent(id!, "controlSize", value)
          }
          styles={{ markLabel: { display: "none" } }}
        />
      </div>

      <Switch
        defaultChecked={loop}
        label="Loop"
        onChange={(event) =>
          updateComponent(id!, "loop", event.currentTarget.checked)
        }
      />

      <Switch
        defaultChecked={draggable}
        label="Draggable"
        onChange={(event) =>
          updateComponent(id!, "draggable", event.currentTarget.checked)
        }
      />

      <Switch
        defaultChecked={dragFree}
        label="Drag Free"
        onChange={(event) =>
          updateComponent(id!, "dragFree", event.currentTarget.checked)
        }
      />

      <Switch
        defaultChecked={withControls}
        label="With Controls"
        onChange={(event) =>
          updateComponent(id!, "withControls", event.currentTarget.checked)
        }
      />

      <Switch
        defaultChecked={withIndicators}
        label="With Indicators"
        onChange={(event) =>
          updateComponent(id!, "withIndicators", event.currentTarget.checked)
        }
      />
    </Stack>
  );
}
