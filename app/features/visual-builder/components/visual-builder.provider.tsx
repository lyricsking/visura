import { createContext, ReactNode, useContext, useState } from "react";
import { ComponentsInfo } from "../types/builder.components";
import { textInfo } from "./text";
import { getNanoid } from "~/shared/utils/util";
import { AddComponent } from "../utils/fns";
import { imageInfo } from "./image";
import { avatarInfo } from "./avatar";
import { faqInfo } from "./faq";

const defaultComponents: ComponentsInfo[] = [
  textInfo,
  imageInfo,
  avatarInfo,
  faqInfo,
];

type VisualBuilderValue = {
  defaultList: ComponentsInfo[];
  components: ComponentsInfo[];
  selection?: string;
  addComponent: AddComponent;
  updateComponent: (id: string, key: string, value: any) => void;
};

const VisualBuilderContext = createContext<VisualBuilderValue | undefined>(
  undefined
);

type VisualBuilderProviderProps = {
  components: ComponentsInfo[];
  children: ReactNode;
};

export default function VisualBuilderProvider({
  components: initialComponents,
  children,
}: VisualBuilderProviderProps) {
  const [components, setComponents] =
    useState<ComponentsInfo[]>(initialComponents);

  // State variable to manage selected component block for editing
  const [selection, setSelection] = useState<string>();

  /**
   * Adds corresponding component with to the components' list
   * @param name string
   */
  const addComponent: AddComponent = (name) => {
    // Find the component info that matches the given name
    const componentInfo = defaultComponents.find((item) => item.name === name);

    // Check if the return component is undefined, else we have our componentInfo
    if (componentInfo) {
      // Since we have our componentInfo, we give it a unique id
      const id = getNanoid(30);

      const newComponentInfo: ComponentsInfo = { ...componentInfo };

      newComponentInfo.props = { ...componentInfo.props, id };

      setComponents([...components, newComponentInfo]);

      setSelection(id);
    }
  };

  /**
   * Adds corresponding component with to the components' list
   * @param id string
   */
  const updateComponent = (id: string, key: string, value: any) => {
    // Find the component info that matches the given name
    const newComponents = components.map((component) => {
      if (component.props.id === id) {
        return { ...component, props: { ...component.props, [key]: value } };
      }
      return component;
    });

    setComponents(newComponents);
  };

  return (
    <VisualBuilderContext.Provider
      value={{
        defaultList: defaultComponents,
        components,
        selection,
        addComponent,
        updateComponent,
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
