import { FormEvent, useState } from "react";
import { PageEditorToolbar } from "../components/page-editor-toolbar";
import { componentsMap } from "~/block";
import { useMediaQuery } from "~/hooks/use-media-query";
import {
  Form,
  useLoaderData,
  useNavigation,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Dialog, DialogContent } from "~/components/dialog";
import CodeMirrorEditor from "~/components/editor/codemirror";
import { yaml } from "@codemirror/lang-yaml";
import { parse, YAMLParseError } from "yaml";
import { Diagnostic, linter } from "@codemirror/lint";
import Button from "~/components/button";
import { ChevronLeft, Copy } from "lucide-react";
import { useToast } from "~/hooks/use-toast";
import { Badge } from "~/components/badge";
import formDataToObject from "~/core/utils/form-data-to-object";
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
import { template } from "lodash";

const COMPONENT_DIALOG_KEY = "component";

export const handle = {
  pageName: "Edit Page",
  breadcrumb: {
    id: "edit-page",
    label: "Edit Page",
  },
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const pagesURL = new URL("http://localhost:3000/api/pages");

  const req = await fetch(pagesURL, { method: "POST", body: formData });

  const json = await req.json();
  console.log(json);

  return json;
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const templateId = url.searchParams.get("template");
  const pageId = url.searchParams.get("pageId");

  const findPageUrl = new URL("http://localhost:3000/api/pages");

  if (url.pathname.includes("pages/create")) {
    if (!templateId) {
      url.searchParams.set("template", "blank");
      return redirect(url.toString());
    }

    findPageUrl.searchParams.set("path", templateId);
    findPageUrl.searchParams.set("template", "true");
    const templateReq = await fetch(findPageUrl);

    return { template: await templateReq.json() };
  } else if (url.pathname.includes("pages/edit") && pageId) {
    findPageUrl.searchParams.set("path", pageId);

    const pageReq = await fetch(findPageUrl);
    return { page: await pageReq.json() };
  }

  return {};
};

export default function PageEditor() {
  const { page, template } = useLoaderData<typeof loader>();

  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const [searchParams, setSearchParams] = useSearchParams();
  const componentName = searchParams.get(COMPONENT_DIALOG_KEY);
  const componentInfo = componentName ? componentsMap[componentName] : null;

  const [yamlContent, setYamlContent] = useState<string>(`sections:
  - type: section
    props:
      blocks:
        - type: text
          props: 
            text: Welcome to My Website
            as: 'p'
            class: "italic"

        - type: text
          props: 
            text: I am Jamiu
            as: 'p'
            class: "font-bold"
  `);

  const [preview, setPreview] = useState<string[]>([]);

  // Hook to determine mediaQuery
  // Used to determine if the current screen is desktop
  const isDesktop = useMediaQuery("(min-width: 768px)");
  //
  const { toast } = useToast();

  // toast({ description: JSON.stringify({ page, template }, null, 2) });

  const handleChange = (value: string) => {
    try {
      setYamlContent(value);

      const parsedYaml: any = parse(value);
      // Update preview
      setPreview(parsedYaml.sections || []);
    } catch (error) {}
  };

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataObject = formDataToObject(new FormData(e.currentTarget));

    try {
      const parsedYaml = parse(yamlContent);
      // Save the YAML content to the database
      // const page: IPage = {
      //   path: "",
      //   metadata: undefined,
      //   content: undefined,
      // };

      // Parse FormData into an array of objects
      const ogTags: { [key: string]: string } = {};

      let properties = dataObject["properties"];
      let contents = dataObject["contents"];

      Array.isArray(properties)
        ? properties.forEach((property, index) => {
            if (property.length) ogTags[property] = contents[index];
          })
        : properties.length
        ? (ogTags[properties] = contents)
        : null;

      const page = {
        path: dataObject["title"],
        title: dataObject["title"],
        description: dataObject["description"],
        keywords: (dataObject["keywords"] as string).split(","),
        ...(ogTags && { ...ogTags }),
        type: "yaml",
        value: yamlContent,
      };

      toast({ description: JSON.stringify(page, null, 2) });

      submit(page, { method: "post" });
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

  return (
    <Form method="post" onSubmit={handleSave}>
      <div className="mx-auto grid gap-4 max-w-[59rem] mb-10 flex-1 auto-rows-max">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="h-7 w-7 mx-0 hidden">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 ">
            Page Name
          </h1>
          <Badge variant="outline" className="ml-auto sm:ml-0">
            Draft
          </Badge>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="ghost" size="sm">
              Discard
            </Button>

            <Button
              size="sm"
              type="submit"
              className="bg-indigo-600 text-white hover:bg-indigo-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving" : "Save Page"}
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            {/*Main content  */}
            <Card className="min-h-[24rem]" x-chunk="dashboard-07-chunk-0">
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
                      placeholder="Enter brief page description."
                      className="min-h-32"
                    />
                  </div>

                  {/* Keywords */}
                  <div className="grid gap-3">
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input
                      id="keywords"
                      name="keywords"
                      type="text"
                      className="w-full"
                      placeholder="Enter keywords (comma-separated)"
                    />
                  </div>

                  <DynamicMetaFields />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="h-full grid auto-rows-max items-start gap-4 lg:gap-8">
            {/* Page sidebar */}
            <Card x-chunk="dashboard-07-chunk-3" className="min-h-[24rem]">
              <CardHeader>
                <CardTitle>Page Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="status">Status</Label>
                    <Select>
                      <SelectTrigger id="status" aria-label="Select status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Templates */}
        {/* <div className="flex items-center gap-4 bg-gray-500"></div> */}

        <div className="h-96 grid md:grid-cols-[1fr_250px] border rounded-lg shadow-md lg:grid-cols-12">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-8 lg:gap-8">
            <CodeMirrorEditor
              value={yamlContent}
              onChange={handleChange}
              extensions={[yaml(), yamlLinter()]}
              className="h-96 p-[2px] rounded-lg  md:rounded-e-none bg-gray-800/90"
            />
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-4 lg:gap-8">
            {isDesktop && (
              <PageEditorToolbar
                isDesktop
                showHintForComponent={(key) => handleShowSettings(true, key)}
              />
            )}
          </div>
        </div>

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
                    onClick={() => copyToClipboard(componentInfo.usageExample)}
                  >
                    <Copy />
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </Form>
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

interface OpenGraphTag {
  property: string;
  content: string;
}

function DynamicMetaFields() {
  const [ogTags, setOgTags] = useState<OpenGraphTag[]>([
    { property: "", content: "" },
  ]);

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
            placeholder="Propery name (e.g keywords, og:title)"
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
