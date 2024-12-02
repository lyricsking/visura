import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import {
  ComponentsInfo,
  ComponentsInfoGroup,
} from "../types/builder.components";

const visualComponentsList: ComponentsInfo[] = [];

type VisualBuilderValue = {
  defaultList: ComponentsInfo[];
  selected: ComponentsInfo[];
  setSelected: Dispatch<SetStateAction<ComponentsInfo[]>>;
};

const VisualBuilderContext = createContext<VisualBuilderValue | undefined>(
  undefined
);

type VisualBuilderProviderProps = {
  components: ComponentsInfo[];
  children: ReactNode;
};

export default function VisualBuilderProvider({
  components,
  children,
}: VisualBuilderProviderProps) {
  const [selectedComponents, setSelectedComponents] =
    useState<ComponentsInfo[]>(components);

  return (
    <VisualBuilderContext.Provider
      value={{
        defaultList: visualComponentsList,
        selected: selectedComponents,
        setSelected: setSelectedComponents,
      }}
    >
      {children}
    </VisualBuilderContext.Provider>
  );
}

export function useVisualBuilder() {
  const context = useContext(VisualBuilderContext);

  if (!context) {
    throw new Error(
      "useVisualBuilder must be used within VisualBuilderProvider"
    );
  }

  return context;
}
