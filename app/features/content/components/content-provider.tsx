import { IContentType } from "../types/content";
import { createContext, ReactNode, useContext, useState } from "react";

export type PropsUpdateFunction = (id: string, key: string, value: any) => void;

type VisualBuilderValue = {
  contents: IContentType[];
};

const VisualBuilderContext = createContext<VisualBuilderValue | undefined>(
  undefined
);

type ContentProviderProps = {
  contents: IContentType[];
  children: ReactNode;
};

export default function ContentProvider({
  contents: defaultContents = [],
  children,
}: ContentProviderProps) {
  const [contents, setContents] = useState<IContentType[]>(defaultContents);

  return (
    <VisualBuilderContext.Provider value={{ contents }}>
      {children}
    </VisualBuilderContext.Provider>
  );
}

export function useContent() {
  const context = useContext(VisualBuilderContext);

  if (!context) {
    throw new Error("useContent must be used within ContentProvider");
  }

  return context;
}
