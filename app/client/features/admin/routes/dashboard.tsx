import {
  AppShell,
  Box,
  Burger,
  Divider,
  Group,
  NavLink,
  ScrollArea,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavLink as ReactNavLink } from "@remix-run/react";

export default function Dashboard() {
  const [opened, { toggle }] = useDisclosure();

  return <Box h="100vh">Dashboard</Box>;
}
