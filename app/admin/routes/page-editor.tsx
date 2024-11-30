import { FormEvent, useState } from "react";
import { PageEditorToolbar } from "../components/page-editor-toolbar";
import { componentsMap } from "~/block";
import { useMediaQuery } from "~/hooks/use-media-query";
import {
  Form,
  Outlet,
  useActionData,
  useLoaderData,
  useLocation,
  useNavigation,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Dialog, DialogContent } from "~/components/dialog";
import CodeMirrorEditor from "~/components/editor/codemirror";
import { yaml } from "@codemirror/lang-yaml";
import { parse, YAMLParseError } from "yaml";
import { Diagnostic, linter } from "@codemirror/lint";
import Button from "~/components/button";
import { ChevronLeft, Copy } from "lucide-react";
import { useToast } from "~/hooks/use-toast";
import { Badge } from "~/components/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/select";
import { Label } from "~/components/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/card";
import { Input } from "~/components/input";
import { Textarea } from "~/components/textarea";
import formDataToObject from "~/utils/form-data-to-object";
import { IPage, OpenGraphTag, PageStatus } from "~/page/types/page";
import { defaultPage, PageModel } from "~/page/models/page.server";
import { getSlug } from "~/utils/string";
import { cn } from "~/utils/util";
import { loader as pageLoader } from "~/page/routes/api/pages.server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/tabs";

const COMPONENT_DIALOG_KEY = "component";

export const handle = {
  pageName: (data: any) => {
    const page = data.pageId;

    if (page) {
      return "Edit Page";
    } else {
      return "Create";
    }
  },
  breadcrumb: {
    id: "edit-page",
    label: "Edit Page",
  },
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = formDataToObject(await request.formData());

  const errors = {};

  const title = formData["title"];
  const description = formData["description"];
  const keywords = formData["keywords"];
  const contentType = formData["contentType"];
  const contentValue = formData["contentValue"];
  const properties = formData["properties"];
  const contents = formData["contents"];
  const status = formData["status"];

  const metadata: IPage["metadata"] = {
    title,
    description,
    keywords,
  };

  const openTags: OpenGraphTag[] = [];
  Array.isArray(properties)
    ? properties.forEach((property, index) => {
        if (typeof property === "string" && property.length > 0)
          openTags
      })
    : typeof properties === "string" && properties.length > 0
    ? (openTags[properties] = contents)
    : null;

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

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

  return await res.json();
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const baseUrl = process.env.BASE_URL || "";
  const pageReqUrl = new URL("/api/pages", baseUrl);

  const pageId = params["pageId"];

  if (url.pathname.includes("pages/create")) {
    const templateId = params["templateId"] || "67497b624940bae1fbb643d5";

    pageReqUrl.searchParams.set("id", templateId);
    pageReqUrl.searchParams.set("template", "true");

    return await (await fetch(pageReqUrl, { method: "GET" })).json();
  } else if (url.pathname.includes("pages/edit") && pageId) {
    pageReqUrl.searchParams.set("id", pageId);

    return await (await fetch(pageReqUrl, { method: "GET" })).json();
  }
};

export default function PageEditor() {
  const page = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  let pageId;
  const location = useLocation();
  if (location.pathname.includes("edit")) pageId = page._id;

  let yamlContent = "page.content.value";

  // Hook to determine mediaQuery
  // Used to determine if the current screen is desktop
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [searchParams, setSearchParams] = useSearchParams();
  const componentName = searchParams.get(COMPONENT_DIALOG_KEY);
  const componentInfo = componentName ? componentsMap[componentName] : null;

  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const [preview, setPreview] = useState<string[]>([]);

  //
  const { toast } = useToast();

  const handleChange = (value: string) => {
    try {
      yamlContent = value;

      const parsedYaml: any = parse(value);
      // Update preview
      setPreview(parsedYaml.sections || []);
    } catch (error) {}
  };

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataObject = formDataToObject(new FormData(e.currentTarget));

    try {
      parse(yamlContent);

      // Parse FormData into an array of objects
      const newPage: Record<string, string> = {
        title: dataObject["title"],
        description: dataObject["description"],
        keywords: dataObject["keywords"],
        contentType: "yaml",
        contentValue: yamlContent,
        properties: dataObject["properties"],
        contents: dataObject["contents"],
        status: dataObject["status"],
      };

      // if (pageId) newPage["path"] = pageId;

      submit(newPage, { method: "post" });
    } catch (error) {
      toast({ description: "Error! Cannot save page. See editor for errors." });
    }
  };

  function handleShowSettings(isOpen: boolean, componentKey?: string): void {
    setSearchParams((prev) => {
      if (isOpen && componentKey) {
        prev.set(COMPONENT_DIALOG_KEY, componentKey);
      } else {
        prev.delete(COMPONENT_DIALOG_KEY);
      }

      return prev;
    });
  }

  // Function to code usage code example to clipboard and show toast notification
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Todo Show toast
    toast({
      description: "Code copied to clipboard!.",
      position: "bottomCenter",
    });
  };

  const saveButtonLabel = pageId ? "Publish" : "Save";
  const isSubmittingLabel = pageId ? "Publishing" : "Saving";
  const saveButtonValue = pageId ? PageStatus.published : PageStatus.draft;

  return (
    <div className="mx-auto grid gap-4 max-w-[59rem] mb-10 flex-1 auto-rows-max">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="h-7 w-7 mx-0 hidden">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 ">
          {page.metadata.title}
        </h1>
        <Badge variant="outline" className="ml-auto sm:ml-0">
          Draft
        </Badge>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="ghost" size="sm">
            Discard
          </Button>

          <Button
            name="status"
            value={saveButtonValue}
            size="sm"
            type="submit"
            className="bg-indigo-600 text-white hover:bg-indigo-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? isSubmittingLabel : saveButtonLabel}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="settings">
        <TabsList className="bg-white border-violet-400 rounded-t-md overflow-x-auto no-scrollbar">
          <TabsTrigger value="settings" className="capitalize">
            Settings
          </TabsTrigger>
          <TabsTrigger value="content" className="capitalize">
            Content
          </TabsTrigger>
        </TabsList>

        <Form method="post" onSubmit={handleSave}>
          <TabsContent value={"settings"} className="h-fit">
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-10 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-6 lg:gap-8">
                {/*Main content  */}
                <Card
                  className="min-h-[24rem] rounded-t-none"
                  x-chunk="dashboard-07-chunk-0"
                >
                  <CardHeader>
                    <CardTitle>Page Info</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      {/* Page Title */}
                      <div className="grid gap-3">
                        <Label htmlFor="title">Page Title</Label>
                        <Input
                          id="title"
                          name="title"
                          defaultValue={page.metadata.title}
                          type="text"
                          className="w-full"
                          placeholder="Enter page title"
                        />
                      </div>

                      {/* Meta description */}
                      <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          defaultValue={page.metadata.description}
                          placeholder="Enter brief page description."
                          className="min-h-32"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid auto-rows-max items-start gap-4 lg:col-span-4 lg:gap-8">
                {/* Page sidebar */}
                <Card
                  x-chunk="dashboard-07-chunk-3"
                  className="min-h-[24rem] rounded-t-none"
                >
                  <CardHeader>
                    <CardTitle>SEO Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      {/* Keywords */}
                      <div className="grid gap-3">
                        <Label htmlFor="keywords">Meta Keywords</Label>
                        <Input
                          id="keywords"
                          name="keywords"
                          defaultValue={page.metadata.keywords}
                          type="text"
                          className="w-full"
                          placeholder="Enter keywords (comma-separated)"
                        />
                      </div>

                      <DynamicMetaFields openTags={page.metadata.openTags} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Templates */}
          {/* <div className="flex items-center gap-4 bg-gray-500"></div> */}
          <TabsContent value={"content"} className="h-fit">
            <div className="h-96 grid md:grid-cols-[1fr_250px] rounded-b-lg shadow-md lg:grid-cols-12">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-8 lg:gap-8">
                <CodeMirrorEditor
                  value={yamlContent}
                  onChange={handleChange}
                  extensions={[yaml(), yamlLinter()]}
                  className="h-96 p-[2px] rounded-b-lg  md:rounded-e-none bg-gray-800/90"
                />
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-4 lg:gap-8">
                {isDesktop && (
                  <PageEditorToolbar
                    isDesktop
                    showHintForComponent={(key) =>
                      handleShowSettings(true, key)
                    }
                  />
                )}
              </div>
            </div>
          </TabsContent>

          <div className="fixed w-full left-0 right-0 bottom-0 flex items-center justify-center gap-2 md:hidden">
            {/* mobile only toolbar here */}
            {!isDesktop && (
              <PageEditorToolbar
                isDesktop={false}
                showHintForComponent={(key) => handleShowSettings(true, key)}
              />
            )}
          </div>

          <div className="flex items-center justify-center gap-2 mb-20 md:hidden">
            <Button variant={"ghost"}>Discard</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving" : "Save Page"}
            </Button>
          </div>

          {componentInfo && (
            <Dialog open={!!componentName} onOpenChange={handleShowSettings}>
              <DialogContent>
                <div className="mt-4">
                  <h3 className="font-semibold">Usage Example</h3>
                  <div className="grid items-center">
                    <pre className="bg-gray-200 p-4 rounded-md overflow-x-auto">
                      {componentInfo.usageExample}
                    </pre>
                    <button
                      className="fixed end-8 p-1 text-gray-400"
                      onClick={() =>
                        copyToClipboard(componentInfo.usageExample)
                      }
                    >
                      <Copy />
                    </button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </Form>
      </Tabs>
    </div>
  );
}

function yamlLinter() {
  return linter((view) => {
    const diagnostics: Diagnostic[] = [];
    try {
      parse(view.state.doc.toString()); // Validates YAML
    } catch (error: any) {
      if (error instanceof YAMLParseError) {
        diagnostics.push({
          from: error.pos[0],
          to: error.pos[1],
          severity: "error", // Specify severity
          message: error.message,
        });
      }
    }
    return diagnostics;
  });
}

type DynamicMetaFieldsProps = { openTags: OpenGraphTag[] };

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
    <fieldset name="tags">
      <legend>
        <Label>Meta Tags</Label>
      </legend>
      {ogTags.map((tag, index) => (
        <div key={index} className="grid grid-cols-2 gap-4 mb-4">
          <Input
            type="text"
            name="properties"
            placeholder="Property name (e.g keywords, og:title)"
            value={tag.property}
            onChange={(e) => handleOgChange(index, "property", e.target.value)}
          />
          <Input
            type="text"
            name="contents"
            placeholder="Content"
            value={tag.content}
            onChange={(e) => handleOgChange(index, "content", e.target.value)}
          />
        </div>
      ))}

      <Button onClick={handleAddOgTag} className="flex ml-auto">
        Add Meta
      </Button>
    </fieldset>
  );
}
