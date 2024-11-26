import { useState } from "react";
import { PageEditorToolbar } from "../components/page-editor-toolbar";
import { JSONDefaultBlocksProps, SettingsSection } from "~/core/blocks/block";
import { useMediaQuery } from "~/hooks/use-media-query";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Dialog, DialogContent } from "~/components/dialog";
import CodeMirrorEditor from "~/components/editor/codemirror";
import { yaml } from "@codemirror/lang-yaml";
import { parse, YAMLParseError } from "yaml";
import { Diagnostic, linter } from "@codemirror/lint";
import Button from "~/components/button";

const SETTINGS_DIALOG = "settingsId";
export const handle = {
  pageName: "Edit Page",
  breadcrumb: {
    id: "edit-page",
    label: "Edit Page",
  },
};

export const loader = ({}: LoaderFunctionArgs) => {
  return { blocks: [] as JSONDefaultBlocksProps[] };
};

export default function PageEditor() {
  const { blocks } = useLoaderData<typeof loader>();

  const [searchParams, setSearchParams] = useSearchParams();
  const activeSettingsId = searchParams.get(SETTINGS_DIALOG);

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

  function handleShowSettings(isOpen: boolean, blockId?: string): void {
    setSearchParams((prev) => {
      if (isOpen && blockId) {
        prev.set(SETTINGS_DIALOG, blockId);
      }

      if (!isOpen) {
        prev.delete(SETTINGS_DIALOG);
      }

      return prev;
    });
  }

  return (
    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
      <div className="flex items-center gap-4">{/* template here */}</div>
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-4">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          {/*Main content  */}
          <div className="bg-gray-100 mb-4">
            <CodeMirrorEditor
              value={yamlContent}
              onChange={handleChange}
              extensions={[yaml(), yamlLinter()]}
            />
            <Button
              className="ml-auto mt-4 bg-violet-500 text-white hover:bg-violet-600"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          {/* Page sidebar */}
          {isDesktop && <PageEditorToolbar isDesktop addBlock={() => {}} />}
        </div>
      </div>
      <div className="fixed w-full left-0 right-0 bottom-0 flex items-center justify-center gap-2 md:hidden">
        {/* mobile only toolbar here */}
        {!isDesktop && (
          <PageEditorToolbar isDesktop={false} addBlock={() => {}} />
        )}
      </div>
      <Dialog open={!!activeSettingsId} onOpenChange={handleShowSettings}>
        <DialogContent></DialogContent>
      </Dialog>
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
