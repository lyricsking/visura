import { Stack, SimpleGrid, TextInput, Flex, Button } from "@mantine/core";
import { Form, useFetcher } from "@remix-run/react";
import { FormEvent } from "react";
import { IContentType } from "~/core/types/content";
import { capitalize } from "~/core/utils/string";

type DocumentFormProps = {
  schema: IContentType;
};

export function DocumentForm({ schema }: DocumentFormProps) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state !== "idle";

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const errors = validateForm(schema, formData);
    if (errors.length > 0) {
      console.error(errors);
      const c = { success: false, errors };

      return;
    }

    fetcher.submit(formData, { method: "POST" });
  }

  const formItems = Object.entries(schema.fields).map(([_, option]) => {
    const { name, type, required } = option;

    switch (type) {
      case "string": {
        return (
          <TextInput
            label={capitalize(name)}
            type={type}
            name={name}
            required={required}
          />
        );
      }

      default:
        return (
          <TextInput
            label={capitalize(name)}
            type="text"
            name={name}
            required={required}
          />
        );
    }
  });

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <SimpleGrid cols={2}>{formItems}</SimpleGrid>

      <Flex justify={"end"}>
        <Button type="submit" children="Submit" loading={isSubmitting} />
      </Flex>
    </Form>
  );
}

export function validateForm(schema: Omit<IContentType, "_id">, formData: any) {
  const errors: string[] = [];

  Object.entries(schema.fields).forEach(([fieldName, option]) => {
    const { name, type, required } = option;
    const value = formData[name];

    if (required && !value) {
      errors.push(`${option.name}  is required`);
    }

    if (type === "number" && typeof value !== "number") {
      errors.push(`${option.name} must be a valid number.`);
    }
  });

  return errors;
}
