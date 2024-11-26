import { useState } from "react";
import { PageEditorToolbar } from "../components/page-editor-toolbar";
import { componentsMap } from "~/core/block";
import { useMediaQuery } from "~/hooks/use-media-query";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Dialog, DialogContent } from "~/components/dialog";
import CodeMirrorEditor from "~/components/editor/codemirror";
import { yaml } from "@codemirror/lang-yaml";
import { parse, YAMLParseError } from "yaml";
import { Diagnostic, linter } from "@codemirror/lint";
import Button from "~/components/button";
import { ChevronLeft, Copy } from "lucide-react";
import { useToast } from "~/hooks/use-toast";
import { Badge } from "~/components/badge";

const COMPONENT_DIALOG_KEY = "component";

export const handle = {
  pageName: "Edit Page",
  breadcrumb: {
    id: "edit-page",
    label: "Edit Page",
  },
};

export const loader = ({}: LoaderFunctionArgs) => {
  return { blocks: [] as any[] };
};

export default function PageEditor() {
  const { blocks } = useLoaderData<typeof loader>();

  const [searchParams, setSearchParams] = useSearchParams();
  const componentName = searchParams.get(COMPONENT_DIALOG_KEY);
  const componentInfo = componentName ? componentsMap[componentName] : null;

  const [yamlContent, setYamlContent] = useState<string>(`sections:
  - type: hero
    props:
      title: Welcome to My Website
      subtitle: Build dynamic pages with ease
      background: /images/hero-bg.jpg`);

  const [preview, setPreview] = useState<string[]>([]);

  // Hook to determine mediaQuery
  // Used to determine if the current screen is desktop
  const isDesktop = useMediaQuery("(min-width: 768px)");
  //
  const { toast } = useToast();

  const handleChange = (value: string) => {
    try {
      setYamlContent(value);

      const parsedYaml: any = parse(value);
      // Update preview
      setPreview(parsedYaml.sections || []);
    } catch (error) {}
  };

  const handleSave = () => {
    try {
      const parsedYaml = parse(yamlContent);
      // Save the YAML content to the database
    } catch (error) {
      alert(JSON.stringify(error, null, 2));
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
  // Fucntion to code usage code example to clipboard and show toast notification
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Todo Show toast
    toast({
      description: "Code copied to clipboard!.",
      position: "bottomCenter",
    });
  };

  return (
    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-2">
      <div className="flex items-center gap-4">
        {/* template here */}
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
            className="bg-indigo-600 text-white"
            onClick={handleSave}
          >
            Save Page
          </Button>
        </div>
      </div>
      <div className="h-96 grid gap-4 mb-8 md:grid-cols-[1fr_250px] border rounded-lg shadow-md lg:grid-cols-12 lg:gap-0">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-9 lg:gap-8">
          {/*Main content  */}

          <CodeMirrorEditor
            value={yamlContent}
            onChange={handleChange}
            extensions={[yaml(), yamlLinter()]}
            className="h-96 p-[2px] rounded-lg md:rounded-s-lg md:rounded-e-none bg-gray-800/90"
          />
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-3 lg:gap-8">
          {/* Page sidebar */}
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
