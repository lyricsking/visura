import { Button, Stack } from "@mantine/core";
import { IContentType } from "../types/content";
import { ReactNode } from "react";
import { capitalize } from "~/shared/utils/string";
import { useSearchParams } from "@remix-run/react";

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
      <Button
        key={content.name}
        component="a"
        href={`/studio.io/${content._id.toString()}`}
        variant={"transparent"}
        size="compact-sm"
        justify="start"
      >
        {capitalize(content.name)}
      </Button>
    );
  };

  return <Stack>{contents && contents.map(contentMap)}</Stack>;
}
