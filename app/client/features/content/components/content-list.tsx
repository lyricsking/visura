import { Button, NavLink, Stack } from "@mantine/core";
import { IContentType } from "../../../../shared/types/content";
import { ReactNode } from "react";
import { capitalize } from "~/shared/utils/string";
import {
  NavLink as ReactNavLink,
  useHref,
  useSearchParams,
} from "@remix-run/react";

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

  const contentMap = (content: IContentType): ReactNode => {
    return (
      <NavLink
        key={content._id.toString()}
        component={ReactNavLink}
        label={capitalize(content.name)}
        to={`${content.name}`}
      />
    );
  };

  return <Stack gap="0">{contents && contents.map(contentMap)}</Stack>;
}