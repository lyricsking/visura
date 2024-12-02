import {
  AppShell,
  AppShellAside,
  Burger,
  Group,
  Skeleton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FigmaLogoIcon } from "@radix-ui/react-icons";
import { ComponentsPanel } from "~/features/visual-builder/components/components-list";
import { ComponentSettingsPanel } from "~/features/visual-builder/components/components-settings-panel";
import VisualBuilderProvider from "~/features/visual-builder/components/visual-builder.provider";

export default function VisualBuilder() {
  const [opened, { toggle }] = useDisclosure();
  const [asideOpened, { toggle: asideToggle }] = useDisclosure();

  function onComponentSelected(name: string): void {}

  return (
    <VisualBuilderProvider components={[]}>
      <AppShell
        header={{ height: 45 }}
        footer={{ height: 60 }}
        navbar={{
          width: 220,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        aside={{
          width: 220,
          breakpoint: "md",
          collapsed: { desktop: false, mobile: !asideOpened },
        }}
        padding="md"
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
        <AppShell.Navbar p="md">
          <ComponentsPanel onComponentSelected={onComponentSelected} />
        </AppShell.Navbar>
        <AppShell.Main>
          Aside is hidden on on md breakpoint and cannot be opened when it is
          collapsed
        </AppShell.Main>
        <AppShell.Aside p="md">
          <ComponentSettingsPanel />
        </AppShell.Aside>
        <AppShell.Footer p="md">Footer</AppShell.Footer>
      </AppShell>
    </VisualBuilderProvider>
  );
}
