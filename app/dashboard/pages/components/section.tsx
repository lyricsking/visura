import { BlockProps } from "./block";
import { EditorType } from "./editor";

export type SectionBlockProp = Omit<BlockProps, "type"> & {};

export function Section(){
  
}

export type SectionEditorType = Omit<
  EditorType,
  "designEditor" | "settingsEditor"
> & {};

export function useSectionEditor(props: SectionBlockProp): SectionEditorType {
  const contentEditor = <></>;

  return {
    ...props,
    contentEditor,
  };
}