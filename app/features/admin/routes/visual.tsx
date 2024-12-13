import { AppShell, Burger, Group, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FigmaLogoIcon } from "@radix-ui/react-icons";
import ComponentsCanvas from "~/features/visual-builder/components/builder-canvas";
import { ComponentSettingsPanel } from "~/features/visual-builder/components/block-settings";
import VisualBuilderProvider, { useVisualBuilder } from "~/features/visual-builder/components/visual-builder.provider";
import { BlockList } from "~/features/visual-builder/components/block-list";
import "@mantine/tiptap/styles.css";
import { useEffect } from "react";

export default function VisualBuilder() {
  return (
    <VisualBuilderProvider components={[]}>
      <VisualBuilderChild />
    </VisualBuilderProvider>
  );
}

/**
 * This sub component is needed to be able to use `useVisualBuilder()` hook,
 * as it can only be used within VisualBuilderProvider
 * @returns
 */
function VisualBuilderChild() {
  const [opened, { toggle }] = useDisclosure();
  const [asideOpened, { toggle: asideToggle }] = useDisclosure();

  const {components, selection} = useVisualBuilder()
  
  // Listen for addition, remival or update changes to components and close navbar if currently opened
  useEffect(() => {
    if (components.length > 0&& opened) {
      toggle()
    }
  }, [components])

  // Listens for changes to selected item, and closes aside 
  useEffect(() => {
    if (selection && !asideOpened) {
      asideToggle();
    } else if(asideOpened) {
      asideToggle()
    }
  }, [selection]);
  
  return (
    <AppShell
      header={{ height: 45 }}
      // footer={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop:false},
      }}
      aside={{
        width: 250,
        breakpoint: "md",
        collapsed: { desktop: false, mobile: !asideOpened },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group h="100%">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            {/* <FigmaLogoIcon className="h-8 w-8" /> */}
            <span className="font-bold text-xl">Visual Builder by Jamiu</span>
          </Group>
          <Burger
            opened={asideOpened}
            onClick={asideToggle}
            hiddenFrom="sm"
            size="sm"
          />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar bg={"#f3f4f6"}>
        <AppShell.Section p="md" grow component={ScrollArea}>
          <BlockList />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <ComponentsCanvas />
      </AppShell.Main>

      <AppShell.Aside bg={"#f3f4f6"}>
        <AppShell.Section p="xs" grow component={ScrollArea}>
          <ComponentSettingsPanel />
        </AppShell.Section>
      </AppShell.Aside>
      {/* <AppShell.Footer p="md">Footer</AppShell.Footer> */}
    </AppShell>
  );
}
