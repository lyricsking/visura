import { Box, Card, Divider, Stack, Title } from "@mantine/core";
import { getAppContext } from "~/app";

export const loader = () => {
  return null;
};

export default function Plugins() {
  return (
    <Stack gap={0} h="calc(100% - 25px)" w="calc(100% - 30px)" mx="auto">
      <Title order={4} size={"h3"} c={"dark"} mt={"1.5rem"} p={"xs"}>
        Plugins
      </Title>

      {/* <Divider size={"xs"} mt={"0.5rem"} /> */}

      <Card
        h="calc(100% - 45px)"
        w="100%"
        m="auto"
        style={{ borderTop: "1px solid #d4d4d4" }}
      ></Card>
    </Stack>
  );
}
