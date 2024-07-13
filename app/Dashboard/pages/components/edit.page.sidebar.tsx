import { useFetcher, useParams, useSubmit } from "@remix-run/react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/shared/components/sheet";
import { BlockButtons } from "./blocks.button";
import { BlockProps } from "./block";
import { DashboardSidebarProps } from "~/dashboard/layout";

export function EditPageSidebar({ setIsOpen }: DashboardSidebarProps) {
  const params = useParams();
  const edit = params.edit;

  const submit = useSubmit();

  // A new blocks value is detected, we should persist to server
  const addBlock = ({ id, type }: BlockProps) => {
    setIsOpen(false);
    submit(
      { id, type, attrs: "", background: "" },
      {
        action: `/dashboard/pages/edit/${edit}`,
        method: "post",
      }
    );
  };

  return (
    <>
      <SheetHeader>
        <SheetTitle>Page blocks</SheetTitle>
        <SheetDescription>
          Use blocks below to build and compose how you want your page to look
          like.
        </SheetDescription>
      </SheetHeader>

      <BlockButtons onAddBlock={addBlock} />
    </>
  );
}
