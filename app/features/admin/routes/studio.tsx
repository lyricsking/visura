import {
  AppShell,
  Burger,
  ScrollArea,
  Group,
  Title,
  Button,
  Flex,
  Divider,
} from "@mantine/core";
import { Outlet, useFetcher, useNavigation } from "@remix-run/react";
import { useDisclosure } from "@mantine/hooks";
import { ContentList } from "~/features/content/components/content-list";
import ContentProvider, {
  useContent,
} from "~/features/content/components/content-provider";

export default function Stuido() {
  return (
    <ContentProvider contents={[]}>
      <StudioChild />
    </ContentProvider>
  );
}

export function StudioChild() {
  const [opened, { toggle }] = useDisclosure();
  const [asideOpened, { toggle: asideToggle }] = useDisclosure();

  const [isModalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const { contents } = useContent();

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
        <AppShell.Section mb={"2rem"}>
          <Flex justify="space-between" mt={"1.5rem"} p={"xs"}>
            <Title order={4} c={"dark"}>
              Content List
            </Title>

            <Button variant="outline" size="compact-sm">
              Create New
            </Button>
          </Flex>

          <Divider size={"xs"} mt={"0.5rem"} />
        </AppShell.Section>

        <AppShell.Section p="md" grow component={ScrollArea}>
          <ContentList contents={contents} onClickHandler={() => {}} />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main bg={"#f3f4f6"}>
        <Outlet />
      </AppShell.Main>

      <AppShell.Aside bg={"#f3f4f6"}>
        <AppShell.Section
          p={"xs"}
          grow
          component={ScrollArea}
        ></AppShell.Section>
      </AppShell.Aside>
      {/* <AppShell.Footer p="md">Footer</AppShell.Footer> */}
    </AppShell>
  );
}
