import { AppShell, Burger, Group, NavLink, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavLink as ReactNavLink } from "@remix-run/react";

export default function Dashboard() {
  const [opened, { toggle }] = useDisclosure();

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
        </Group>
      </AppShell.Header>

      <AppShell.Navbar bg={"#f3f4f6"} p="sm">
        <AppShell.Section p={"md"}>Dashboard</AppShell.Section>
        <AppShell.Section p="md" grow component={ScrollArea}>
          <NavLink
            component={ReactNavLink}
            label="Collections"
            to="collections"
          />
          <NavLink component={ReactNavLink} label="Page Builder" to="builder" />
          <NavLink component={ReactNavLink} label="Media" to="media" />
          <NavLink component={ReactNavLink} label="Settings" to="settings" />
        </AppShell.Section>
        <AppShell.Section p={"md"}>
          <NavLink component={ReactNavLink} label="Support" to="support" />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main bg={"#f3f4f6"}></AppShell.Main>
      {/* <AppShell.Footer p="md">Footer</AppShell.Footer> */}
    </AppShell>
  );
}
