import {
  ColorInput,
  Fieldset,
  NativeSelect,
  NumberInput,
  Slider,
  Stack,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import id from "~/features/temp/SubscriptionBox/Order/routes/id";
import { marks } from "../utils/marks";

type BorderInputProps = {
  styles: any;
  onChange: (styles: any) => void;
};

export default function BorderInput({ onChange, styles }: BorderInputProps) {
  const handleStyleChnage = (property: string, value: string) => {
    onChange({ ...styles, [property]: value });
  };

  const borderInputs = [
    { label: "Top", side: "borderTop" },
    { label: "Right", side: "borderRight" },
    { label: "Bottom", side: "borderBottom" },
    { label: "Left", side: "borderLeft" },
  ];

  return (
    <Stack>
      {borderInputs.map(({ label, side }) => {
        const width = styles[side as keyof typeof styles].split(" ")[0];
        const style = styles[side as keyof typeof styles].split(" ")[1];
        const color = styles[side as keyof typeof styles].split(" ")[2];

        return (
          <Fieldset legend={`${label} Border`}>
            <NumberInput
              label="Width (px)"
              defaultValue={String(width).replace("px", "")}
              min={0}
              onChange={(value) =>
                handleStyleChnage(side, `${value}px ${style} ${color}`)
              }
            />

            <NativeSelect
              label="Style"
              defaultValue={style}
              onChange={(event) =>
                handleStyleChnage(
                  side,
                  `${width} ${event?.currentTarget.value} ${color}`
                )
              }
              data={["none", "solid", "dashed", "dotted"]}
            />

            <ColorInput
              label="Color"
              description="Pick a border color, Click the picker icon on the right to pick from anywhere on the screen"
              defaultValue={color as string}
              onChange={(value) =>
                handleStyleChnage(side, `${width} ${style} ${value}`)
              }
            />
          </Fieldset>
        );
      })}

      <NumberInput
        label="Radius (px)"
        defaultValue={String(styles["borderRadius"]).replace("px", "")}
        min={0}
        onChange={(value) => handleStyleChnage("borderRadius", `${value}px`)}
      />
    </Stack>
  );
}
