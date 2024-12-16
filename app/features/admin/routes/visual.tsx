import {
  AppShell,
  Burger,
  Button,
  Fieldset,
  Flex,
  Group,
  Modal,
  ScrollArea,
  SimpleGrid,
  Stack,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ComponentsCanvas from "~/features/visual-builder/components/builder-canvas";
import { ComponentSettingsPanel } from "~/features/visual-builder/components/block-settings";
import VisualBuilderProvider, {
  useVisualBuilder,
} from "~/features/visual-builder/components/visual-builder.provider";
import { BlockList } from "~/features/visual-builder/components/block-list";
import "@mantine/tiptap/styles.css";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { IPage, OpenGraphTag, PageContent } from "~/features/page/types/page";
import { Types } from "mongoose";
import { getSlug } from "~/shared/utils/string";
import formDataToObject from "~/shared/utils/form-data-to-object";
import { PageModel } from "~/features/page/models/page.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.json();

  const errors = {};

  const title = formData["title"];
  const description = formData["description"];
  const keywords = formData["keywords"];
  const contentType = formData["contentType"];
  const contentValue = formData["contentValue"];
  const properties = formData["properties"];
  const contents = formData["contents"];
  const status = formData["status"];

  const openTags: OpenGraphTag[] = [];
  Array.isArray(properties)
    ? properties.forEach((property, index) => {
        if (typeof property === "string" && property.length > 0)
          openTags.push({ property, content: contents[index] });
      })
    : typeof properties === "string" && properties.length > 0
    ? openTags.push({ property: properties, content: contents })
    : null;

  const metadata: IPage["metadata"] = {
    title,
    description,
    keywords,
    openTags: openTags || undefined,
  };

  const pageData: Partial<IPage> = {
    path: getSlug(title),
    metadata,
    content: {
      type: contentType,
      value: contentValue,
    },
    status: status,
  };

  const res = await fetch("http://localhost:3000/api/pages", {
    method: "POST",
    body: JSON.stringify(pageData),
    headers: { "Content-Type": "application/json" },
  });

  console.log(JSON.stringify(pageData, null, 2));

  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));

  return data;
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const pageId = params["pageId"];
  //  Create a default blank page
  let page: Omit<IPage, "id"> = {
    metadata: {
      title: "Page Title",
      description: "Page description",
      keywords: "",
      openTags: [
        { property: "og:title", content: "Page title for social media" },
      ],
    },
    content: {
      type: "block",
      value: {},
    },
    createdBy: new Types.ObjectId(),
    status: "draft",
  };

  if (pageId) {
    // Fetch page if pageId is provided and valid
    const foundPage = await PageModel.findById(pageId);
    // Ensures the the fetched page is valid, otherwise return a default page object
    foundPage && (page = foundPage);
  }

  return { page };
};

export default function VisualBuilder() {
  return (
    <VisualBuilderProvider components={[]}>
      <VisualBuilderChild />
    </VisualBuilderProvider>
  );
}

/**
 * This sub component is needed to be able to use `useVisualBuilder()` hook,
 * as it can only be used within VisualBuilderProvider
 * @returns
 */
function VisualBuilderChild() {
  const { page } = useLoaderData<typeof loader>();

  const [opened, { toggle }] = useDisclosure();
  const [asideOpened, { toggle: asideToggle }] = useDisclosure();

  const [isModalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const { components, selection } = useVisualBuilder();

  const submit = useSubmit();

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  // Listen for addition, remival or update changes to components and close navbar if currently opened
  useEffect(() => {
    if (components.length > 0 && opened) {
      toggle();
    }
  }, [components]);

  // Listens for changes to selected item, and closes aside
  useEffect(() => {
    if (selection && !asideOpened) {
      asideToggle();
    } else if (asideOpened) {
      asideToggle();
    }
  }, [selection]);

  function savePage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const dataObject = formDataToObject(new FormData(e.currentTarget));

    // Parse FormData into an array of objects
    const newPage: Record<string, any> = {
      title: dataObject["title"],
      description: dataObject["description"],
      keywords: dataObject["keywords"],
      contentType: page.content.type,
      contentValue: components,
      properties: dataObject["properties"],
      contents: dataObject["contents"],
      status: dataObject["status"] || page.status,
    };

    submit(newPage, { method: "post", encType: "application/json" });
  }

  return (
    <AppShell
      header={{ height: 45 }}
      // footer={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: false },
      }}
      aside={{
        width: 250,
        breakpoint: "md",
        collapsed: { mobile: !asideOpened, desktop: false },
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
        <AppShell.Section p="md" grow component={ScrollArea}>
          <BlockList />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main bg={"#f3f4f6"}>
        <ComponentsCanvas onSave={() => openModal()} />

        <Modal
          opened={isModalOpened}
          onClose={closeModal}
          title="Page Settings"
          centered
          scrollAreaComponent={ScrollArea.Autosize}
        >
          <Form method="post" onSubmit={savePage}>
            <Stack>
              <SimpleGrid cols={2}>
                <TextInput
                  label="Page name"
                  name="title"
                  defaultValue={page.metadata.title}
                  placeholder="Enter page title"
                  withAsterisk
                />

                <TextInput
                  label="Page Description"
                  name="description"
                  placeholder="Enter brief page description."
                  defaultValue={page.metadata.description}
                  withAsterisk
                />

                <TextInput
                  id="keywords"
                  label="Meta Keywords"
                  name="keywords"
                  defaultValue={page.metadata.keywords}
                  placeholder="Enter keywords (comma-separated)"
                />
              </SimpleGrid>

              <DynamicMetaFields openTags={page.metadata.openTags} />

              <Flex justify="end">
                <Button
                  type="submit"
                  justify="end"
                  loading={isSubmitting}
                  loaderProps={{ type: "dots" }}
                >
                  Save
                </Button>
              </Flex>
            </Stack>
          </Form>
        </Modal>
      </AppShell.Main>

      <AppShell.Aside bg={"#f3f4f6"}>
        <AppShell.Section p={"xs"} component={ScrollArea}>
          <ComponentSettingsPanel />
        </AppShell.Section>
      </AppShell.Aside>
      {/* <AppShell.Footer p="md">Footer</AppShell.Footer> */}
    </AppShell>
  );
}

type DynamicMetaFieldsProps = { openTags?: OpenGraphTag[] };

function DynamicMetaFields({ openTags }: DynamicMetaFieldsProps) {
  const [ogTags, setOgTags] = useState<OpenGraphTag[]>(
    openTags || [{ property: "", content: "" }]
  );

  const handleAddOgTag = () => {
    setOgTags([...ogTags, { property: "", content: "" }]);
  };

  const handleOgChange = (
    index: number,
    field: keyof OpenGraphTag,
    value: string
  ) => {
    const updatedOgTags = [...ogTags];
    updatedOgTags[index][field] = value;
    setOgTags(updatedOgTags);
  };

  return (
    <Fieldset legend="Meta Tags" name="tags">
      {ogTags.map((tag, index) => (
        <div key={index} className="grid grid-cols-2 gap-4 mb-4">
          <TextInput
            label="Property Name"
            name="properties"
            placeholder="Property name (e.g og:title)"
            defaultValue={tag.property}
            onChange={(e) => handleOgChange(index, "property", e.target.value)}
          />
          <TextInput
            label="Property Value"
            name="contents"
            placeholder="Content"
            defaultValue={tag.content}
            onChange={(e) => handleOgChange(index, "content", e.target.value)}
          />
        </div>
      ))}

      <Flex justify="end">
        <Button justify="end" onClick={handleAddOgTag}>
          Add Meta
        </Button>
      </Flex>
    </Fieldset>
  );
}
