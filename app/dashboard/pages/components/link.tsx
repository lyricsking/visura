import { useFetcher } from "@remix-run/react";
import React from "react";
import { EditorType } from "./editor";

export function Link() {}

interface LinkData extends EditorType {}
export function useLinkEditor(params: any): LinkData {
  const fetcher = useFetcher();

  const onselectChange = (e: any) => {};
  const content = <></>;
  return {
    content,
    attrs: "",
  };
}
