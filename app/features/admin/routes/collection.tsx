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
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { useDisclosure } from "@mantine/hooks";
import { ContentList } from "~/features/collection/components/collection-list";
import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ params }: LoaderFunctionArgs) {
  // Fetch page if pageId is provided and valid
  const pageReqUrl = new URL("http://localhost:3000/api/collections");

  const contents = await (await fetch(pageReqUrl, { method: "GET" })).json();
  // Ensures the the fetched page is valid, otherwise return a default page object

  return contents;
}

export default function Content() {
  const { data, pagination } = useLoaderData<typeof loader>();

  const [opened, { toggle }] = useDisclosure();
  const [asideOpened, { toggle: asideToggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 45 }}
      // footer={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: false },
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
        <AppShell.Section mb={"lg"}>
          <Flex justify="space-between" mt={"1.5rem"} p={"xs"}>
            <Title order={4} c={"dark"}>
              Content List
            </Title>

            <Button
              component={NavLink}
              to="/dashboard/content/create"
              variant="outline"
              size="compact-sm"
            >
              Create New
            </Button>
          </Flex>

          <Divider size={"xs"} mt={"0.5rem"} />
        </AppShell.Section>

        <AppShell.Section grow component={ScrollArea} p={"xs"}>
          <ContentList contents={data || []} onClickHandler={() => {}} />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main bg={"#f3f4f6"}>
        <Outlet />
      </AppShell.Main>

      {/* <AppShell.Aside bg={"#f3f4f6"}>
        <AppShell.Section
          p={"xs"}
          grow
          component={ScrollArea}
        ></AppShell.Section>
      </AppShell.Aside> */}
      {/* <AppShell.Footer p="md">Footer</AppShell.Footer> */}
    </AppShell>
  );
}
