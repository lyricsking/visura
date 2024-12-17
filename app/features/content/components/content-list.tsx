import { Group, UnstyledButton } from "@mantine/core";
import { IContentType } from "../types/content";
import { ReactNode } from "react";
import { upperFirst } from "lodash";
import { capitalize } from "~/shared/utils/string";

type ContentListProps = {
  contents: IContentType[];
  onClickHandler: (value: any) => void;
};

/**
 *
 * @param props [ContentListProps]
 * @returns
 */
export function ContentList(props: ContentListProps) {
  const { contents } = props;

  function svg(
    value: IContentType,
    index: number,
    array: IContentType[]
  ): ReactNode {
    return (
      <UnstyledButton key={value.name}>{capitalize(value.name)}</UnstyledButton>
    );
  }

  return <Group>{contents && contents.map(svg)}</Group>;
}
