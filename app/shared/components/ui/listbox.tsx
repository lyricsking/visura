import React from "react";
import { CommonProps } from "../types/common.props";

type ListBoxParams = Pick<
  CommonProps<
    (
      item: any
    ) => React.ReactElement | React.ReactElement | React.ReactElement[]
  >,
  "children"
> & {
  orientation: "vertical" | "horizontal";
  items?: any[];
};

type ListBoxItemParams = Pick<CommonProps<React.ReactNode>, "children">;

export default function ListBox(params: ListBoxParams) {
  const { orientation } = params;

  let className = "flex";
  if (orientation === "vertical")
    className += " flex flex-col gap-4 overflow-y-auto no-scrollbar";
  else if (orientation === "horizontal")
    className += " flex-row gap-4 overflow-x-auto no-scrollbar";

  return (
    <div className={className}>
      {typeof params.children === "function"
        ? params.items
          ? params.items.map((item) => params.children(item))
          : null
        : params.children}
    </div>
  );
}

function ListBoxItem(params: ListBoxItemParams) {
  return <div>{params.children}</div>;
}

ListBox.Item = ListBoxItem;
