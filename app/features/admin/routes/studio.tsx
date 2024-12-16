import {
  AppShell,
  Burger,
  ScrollArea,
  Modal,
  Stack,
  SimpleGrid,
  TextInput,
  Flex,
  Button,
  Group,
} from "@mantine/core";
import { Form, useNavigation } from "@remix-run/react";
import { BlockList } from "~/features/visual-builder/components/block-list";
import { ComponentSettingsPanel } from "~/features/visual-builder/components/block-settings";
import ComponentsCanvas from "~/features/visual-builder/components/builder-canvas";
import page from "~/shared/components/ui/page";
import C from "../../content/components/c";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, FormEvent } from "react";
import { useVisualBuilder } from "~/features/visual-builder/components/visual-builder.provider";
import formDataToObject from "~/shared/utils/form-data-to-object";

export default function Studio() {
  const [opened, { toggle }] = useDisclosure();
  const [asideOpened, { toggle: asideToggle }] = useDisclosure();

  const [isModalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const { components, selection } = useVisualBuilder();

  // Listen for addition, remival or update changes to components and close navbar if currently opened
  useEffect(() => {
    if (components.length > 0 && opened) {
      toggle();
    }
  }, [components]);

  // Listens for changes to selected item, and closes aside
  useEffect(() => {
    if (selection && !asideOpened) {
      asideToggle();
    } else if (asideOpened) {
      asideToggle();
    }
  }, [selection]);

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  return (
    <AppShell
      header={{ height: 45 }}
      // footer={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: false },
      }}
      aside={{
        width: 250,
        breakpoint: "md",
        collapsed: { mobile: !asideOpened, desktop: false },
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

      <AppShell.Main bg={"#f3f4f6"}>
        <C />
      </AppShell.Main>

      <AppShell.Aside bg={"#f3f4f6"}>
        <AppShell.Section p={"xs"} component={ScrollArea}>
          <ComponentSettingsPanel />
        </AppShell.Section>
      </AppShell.Aside>
      {/* <AppShell.Footer p="md">Footer</AppShell.Footer> */}
    </AppShell>
  );
}
