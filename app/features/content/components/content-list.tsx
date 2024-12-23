import { Button, NavLink, Stack } from "@mantine/core";
import { IContentType } from "../types/content";
import { ReactNode } from "react";
import { capitalize } from "~/shared/utils/string";
import { NavLink as ReactNavLink, useHref, useSearchParams } from "react-router";

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

  // Hook to update searchParams whenever content is clicked to be displayed
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (content: IContentType) => {
    setSearchParams((prev) => {
      prev.set("id", content._id.toString());

      return prev;
    });
  };

  const contentMap = (content: IContentType): ReactNode => {
    return (
      <NavLink
        key={content._id.toString()}
        component={ReactNavLink}
        label={capitalize(content.name)}
        to={`dashboard/content/${content._id.toString()}`}
      />
    );
  };

  return <Stack gap="0">{contents && contents.map(contentMap)}</Stack>;
}
