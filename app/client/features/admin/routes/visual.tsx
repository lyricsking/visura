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

import "@mantine/tiptap/styles.css";
import { FormEvent, useEffect, useState } from "react";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import { Types } from "mongoose";
import { getSlug } from "~/core/utils/string";
import formDataToObject from "~/core/utils/form-data-to-object";
import { logger } from "~/core/utils/logger";
import { OpenGraphTag, IPage, IPageWithOptionalId } from "~/core/types/page";
import { BlockList } from "../../visual-builder/components/block-list";
import { ComponentSettingsPanel } from "../../visual-builder/components/block-settings";
import BuilderCanvas from "../../visual-builder/components/builder-canvas";
import VisualBuilderProvider, {
  useVisualBuilder,
} from "../../visual-builder/components/visual-builder.provider";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const pageId = params["id"];

  const method = request.method.toUpperCase();

  try {
    if (method === "POST" || method === "PUT") {
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

      if (method === "POST") {
        const apiURL = new URL("http://localhost:3000/api/pages");
        return await (
          await fetch(apiURL, {
            method: "POST",
            body: JSON.stringify(pageData),
            headers: { "Content-Type": "application/json" },
          })
        ).json();
      } else {
        if (!pageId)
          return Response.json(
            { error: "ID is required for update" },
            { status: 400 }
          );

        const apiURL = new URL(`http://localhost:3000/api/pages/${pageId}`);

        return await (
          await fetch(apiURL, {
            method: "PUT",
            body: JSON.stringify(pageData),
            headers: { "Content-Type": "application/json" },
          })
        ).json();
      }
    } else if (method === "DELETE") {
      if (!pageId)
        return Response.json(
          { error: "ID is required for deletion" },
          { status: 400 }
        );
      const apiURL = new URL(`http://localhost:3000/api/pages/${pageId}`);
      return await (await fetch(apiURL, { method: "DELETE" })).json();
    }
  } catch (error) {
    logger(error);
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const { id } = params;

  //  Create a default blank page
  let page: IPageWithOptionalId = {
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

  const pageReqUrl = new URL("http://localhost:3000/api/pages");

  const allPages = (await (await fetch(pageReqUrl, { method: "GET" })).json())[
    "data"
  ];

  // Fetch page if pageId is provided and valid
  if (id && id !== "new") {
    const pageReqUrl = new URL(`http://localhost:3000/api/pages/${id}`);

    const foundPage = await (await fetch(pageReqUrl, { method: "GET" })).json();
    console.log(foundPage);

    // Ensures the the fetched page is valid, otherwise return a default page object
    if (foundPage && foundPage.error) {
      const currentUrl = new URL(request.url);
      currentUrl.pathname = "dashboard/builder";

      return redirect(currentUrl.toString());
    } else {
      page = foundPage;
    }
  }

  return { page: page, all: allPages };
};

export default function VisualBuilder() {
  const { all, page } = useLoaderData<typeof loader>();

  return (
    <VisualBuilderProvider components={page.content.value}>
      <VisualBuilderConsumer
        all={all}
        page={page as unknown as IPageWithOptionalId}
      />
    </VisualBuilderProvider>
  );
}

type VisualBuilderType = {
  all: IPageWithOptionalId[];
  page: IPageWithOptionalId;
};

/**
 * This sub component is needed to be able to use `useVisualBuilder()` hook,
 * as it can only be used within VisualBuilderProvider
 * @returns [React.Element]
 */
function VisualBuilderConsumer({ all, page }: VisualBuilderType) {
  const [opened, { toggle }] = useDisclosure();
  const [asideOpened, { toggle: asideToggle }] = useDisclosure();

  const [isModalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const { components, selection } = useVisualBuilder();

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

  const fetcher = useFetcher();
  const isSubmitting = fetcher.state !== "idle";

  function savePage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = formDataToObject(new FormData(e.currentTarget));

    // Parse FormData into an array of objects
    const newPage: Record<string, any> = {
      title: data["title"],
      description: data["description"],
      keywords: data["keywords"],
      contentType: "block",
      contentValue: components,
      properties: data["properties"],
      contents: data["contents"],
      status: data["status"], //|| page.status,
    };

    fetcher.submit(newPage, { method: "post", encType: "application/json" });
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
        <BuilderCanvas pages={all} onSave={() => openModal()} />

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
