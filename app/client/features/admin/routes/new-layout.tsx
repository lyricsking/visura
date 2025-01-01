import {
  AppShell,
  Box,
  Burger,
  Card,
  Center,
  Container,
  Divider,
  Flex,
  Group,
  NavLink,
  ScrollArea,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, Outlet, NavLink as ReactNavLink } from "@remix-run/react";

export default function Layout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 45 }}
      // footer={{ height: 60 }}
      navbar={{
        width: 200,
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
        </Group>
      </AppShell.Header>

      <AppShell.Navbar bg={"white"}>
        <AppShell.Section p={"sm"}>
          <NavLink component={Link} fw={"bold"} label="Dashboard" to="" />
        </AppShell.Section>

        <Divider mb={0} />

        <AppShell.Section p="sm" grow component={ScrollArea}>
          <NavLink
            component={ReactNavLink}
            label="Collections"
            to="collections"
          />
          <NavLink component={ReactNavLink} label="Page Builder" to="builder" />
          <NavLink component={ReactNavLink} label="Media" to="media" />
          <NavLink component={ReactNavLink} label="Plugins" to="plugins" />
          <NavLink component={ReactNavLink} label="Settings" to="settings" />
        </AppShell.Section>
        <AppShell.Section p={"sm"}>
          <NavLink component={ReactNavLink} label="Support" to="support" />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main bg={"#f3f4f6"}>
        <Center h="calc(100vh - 55px)">
          <Outlet />
        </Center>
      </AppShell.Main>
      {/* <AppShell.Footer p="md">Footer</AppShell.Footer> */}
    </AppShell>
  );
}
