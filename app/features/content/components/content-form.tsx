import {
  Button,
  Divider,
  Fieldset,
  Flex,
  NativeSelect,
  ScrollArea,
  SimpleGrid,
  Stack,
  Switch,
  TextInput,
  Title,
} from "@mantine/core";
import { Form, useNavigation, useSubmit } from "@remix-run/react";
import { FormEvent, useState } from "react";
import { Field, IContentType } from "../types/content";
import formDataToObject from "~/shared/utils/form-data-to-object";
import { ActionFunctionArgs } from "@remix-run/node";

type ContentFormProps = {
  content: IContentType;
};

export default function ContentForm(props: ContentFormProps) {
  const { content } = props;

  const [fields, setFields] = useState<Field[]>([
    { name: "", type: "", required: false },
  ]);

  const handleAddOgTag = () => {
    setFields([...fields, { name: "", type: "", required: false }]);
  };

  return (
    <Stack gap={0} h={"calc(100vh - 150px)"} w={"100%"}>
      <Flex justify="space-between" mt={"1.5rem"} p={"xs"}>
        <Title order={4} c={"dark"}>
          Content Form
        </Title>

        <Button
          form="content-form"
          type="submit"
          variant="outline"
          size="compact-sm"
        >
          Save
        </Button>
      </Flex>

      <Divider size={"xs"} mt={"0.5rem"} />

      <Stack component={ScrollArea} mih={"100%"} mt={"lg"} px={"xs"}>
        <Form id="content-form" method="POST">
          <Stack>
            <TextInput
              label="Content Name"
              description="Give a name to the content."
              name="schemaName"
              placeholder="User, Order, Product, Model etc"
              required
            />

            <Fieldset legend="Fields" name="tags">
              <SimpleGrid cols={{ base: 1, lg: 5 }}>
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
          </Stack>
        </Form>
      </Stack>
    </Stack>
  );
}
