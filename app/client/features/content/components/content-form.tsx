import {
  Box,
  Button,
  Divider,
  Fieldset,
  Flex,
  Group,
  NativeSelect,
  ScrollArea,
  SimpleGrid,
  Stack,
  Switch,
  TextInput,
  Title,
} from "@mantine/core";
import { useFetcher } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { Field, IContentType } from "../../../../shared/types/content";

type ContentFormProps = {
  content: IContentType;
};

export default function ContentForm(props: ContentFormProps) {
  const { content } = props;

  const [fields, setFields] = useState<Field[]>(
    content.fields && content.fields.length > 0
      ? content.fields
      : [{ name: "", type: "", required: false }]
  );

  // Flag to identify when this mounted
  const mountRun = useRef(false);

  useEffect(() => {
    // useEffect will run when component is first mounted,
    // even though no change occurred
    if (!mountRun.current) {
      mountRun.current = true;
      return;
    }

    if (content && content.fields && content.fields.length > 0)
      setFields(content.fields);
  }, [content]);

  const fetcher = useFetcher({ key: "content-form-fetcher" });
  const isSubmitting = fetcher.state !== "idle";

  const handleAddOgTag = () => {
    setFields([...fields, { name: "", type: "", required: false }]);
  };

  return (
    <Stack gap={0} w={"100%"} mx="auto">
      <Title order={4} c={"dark"} mt={"1.5rem"} p={"xs"}>
        Content Form
      </Title>

      <Divider size={"xs"} mt={"0.5rem"} />

      <Box
        h={{ base: "100%", md: "calc(100vh - 125px)" }}
        p={"md"}
        bg={"white"}
      >
        <Stack
          component={ScrollArea}
          h={{ base: "100%", md: "calc(100vh - 160px)" }}
          maw={{ base: "100%", md: "70%" }}
          mx="auto"
          mt={"lg"}
          px={"xl"}
        >
          <Flex justify="end" mt={"1.5rem"}>
            <Button
              form="content-form"
              type="submit"
              variant="outline"
              size="compact-sm"
              loading={isSubmitting}
              loaderProps={{ type: "dots" }}
            >
              Save
            </Button>
          </Flex>

          <fetcher.Form id="content-form" method="POST">
            <TextInput
              label="Content Name"
              description="Give a name to the content."
              name="schemaName"
              defaultValue={content.name}
              placeholder="User, Order, Product, Model etc"
              required
            />

            <Fieldset legend="Fields" name="tags">
              <SimpleGrid cols={{ base: 1, lg: 2 }}>
                {fields.map((field, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                    <TextInput
                      label="Field Name"
                      name="name"
                      placeholder="Enter field name"
                      defaultValue={field.name}
                      //   onChange={(e) => handleOgChange(index, "property", e.target.value) }
                      required
                    />

                    <NativeSelect
                      label="Field Type"
                      name="type"
                      defaultValue={String(field.type)}
                      data={[
                        { label: "String", value: "string" },
                        { label: "Number", value: "number" },
                        { label: "Boolean", value: "boolean" },
                        { label: "Date", value: "date" },
                      ]}
                      required
                    />

                    <Switch
                      label="Required"
                      description="Specify if field is required"
                      labelPosition="left"
                      name="required"
                      defaultChecked={field.required}
                    />
                  </div>
                ))}
              </SimpleGrid>

              <Flex justify="end">
                <Button justify="end" onClick={handleAddOgTag}>
                  Add Meta
                </Button>
              </Flex>
            </Fieldset>
          </fetcher.Form>
        </Stack>
      </Box>
    </Stack>
  );
}
