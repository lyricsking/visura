import { createContext, ReactNode, useContext, useState } from "react";
import { ComponentsInfo } from "../types/builder.components";
import { textInfo } from "./text";
import { getNanoid } from "~/shared/utils/util";
import { AddComponent } from "../utils/fns";
import { imageInfo } from "./image";
import { avatarInfo } from "./avatar";
import { faqInfo } from "./faq";
import { dividerInfo } from "./divider";
import { carouselInfo } from "./carousel";
import { hero1Info } from "./hero-1";
import { titleInfo } from "./title";
import { buttonInfo } from "./button";

const defaultComponents: ComponentsInfo[] = [
  // pageInfo,
  textInfo,
  titleInfo,
  buttonInfo,
  imageInfo,
  avatarInfo,
  faqInfo,
  hero1Info,
  dividerInfo,
  carouselInfo,
];

export type PropsUpdateFunction = (id: string, key: string, value: any) => void;

type VisualBuilderValue = {
  defaultList: ComponentsInfo[];
  components: ComponentsInfo[];
  selection?: string;
  setSelection: (selection: string) => void;
  addComponent: AddComponent;
  updateProps: PropsUpdateFunction;
  deleteComponent: (id: string) => void;
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
  const updateProps = (id: string, key: string, value: any) => {
    // Find the component info that matches the given name
    const newComponents = components.map((component) => {
      if (component.props.id === id) {
        return { ...component, props: { ...component.props, [key]: value } };
      }
      return component;
    });

    setComponents(newComponents);
  };

  /**
   * Delete corresponding component with the provided from the components' list
   * @param id string
   */
  const deleteComponent = (id: string) => {
    // Find the component info that matches the given name
    const newComponents = components.filter(
      (component) => component.props.id !== id
    );

    setComponents(newComponents);
  };

  return (
    <VisualBuilderContext.Provider
      value={{
        defaultList: defaultComponents,
        components,
        selection,
        setSelection,
        addComponent,
        deleteComponent,
        updateProps,
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