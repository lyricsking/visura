import { AppShell, Burger, Group, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FigmaLogoIcon } from "@radix-ui/react-icons";
import ComponentsCanvas from "~/features/visual-builder/components/builder-canvas";
import { ComponentSettingsPanel } from "~/features/visual-builder/components/block-settings";
import VisualBuilderProvider from "~/features/visual-builder/components/visual-builder.provider";
import { BlockList } from "~/features/visual-builder/components/block-list";

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

  return (
    <AppShell
      header={{ height: 45 }}
      // footer={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
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
            <FigmaLogoIcon className="h-8 w-8" />
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
