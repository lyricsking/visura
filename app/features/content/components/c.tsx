import {
  Button,
  Fieldset,
  Flex,
  NativeSelect,
  SimpleGrid,
  Stack,
  Switch,
  TextInput,
} from "@mantine/core";
import { Form } from "@remix-run/react";
import { useState } from "react";
import { Field } from "../types/content";

export default function C() {
  const [fields, setFields] = useState<Field[]>([
    { name: "", type: "", required: false },
  ]);

  const handleAddOgTag = () => {
    setFields([...fields, { name: "", type: "", required: false }]);
  };

  return (
    <Stack p={"sm"}>
      <Form method="POST">
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
                  required
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
      </Form>
    </Stack>
  );
}
