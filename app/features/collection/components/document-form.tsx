import { Stack, SimpleGrid, TextInput, Flex, Button } from "@mantine/core";
import { Form } from "@remix-run/react";

export function DocumentForm() {
  return (
    <Form method="post">
      <Stack>
        <SimpleGrid cols={2}>
          <TextInput
            label="Page name"
            name="title"
            placeholder="Enter page title"
            withAsterisk
          />

          <TextInput
            label="Page Description"
            name="description"
            placeholder="Enter brief page description."
            withAsterisk
          />

          <TextInput
            id="keywords"
            label="Meta Keywords"
            name="keywords"
            placeholder="Enter keywords (comma-separated)"
          />
        </SimpleGrid>

        <Flex justify="end">
          <Button type="submit" justify="end" loaderProps={{ type: "dots" }}>
            Save
          </Button>
        </Flex>
      </Stack>
    </Form>
  );
}
