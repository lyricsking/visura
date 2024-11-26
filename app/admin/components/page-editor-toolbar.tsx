import { Eye, Settings } from "lucide-react";
import Button from "~/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/sheet";
import { componentsMap } from "~/core/block";

type ToolbarProps = {
  showHintForComponent: (key: string) => void;
  // showSettings: SettingsFunction;
  isDesktop?: boolean;
};

export function PageEditorToolbar({
  showHintForComponent,
  isDesktop = false,
}: ToolbarProps) {
  if (isDesktop) {
    return (
      <Card className="h-96 rounded-s-none overflow-y-auto">
        <CardHeader>
          <CardTitle className="text-center">Add Block</CardTitle>
          <CardDescription className="text-center">
            Add any number of blocks to your custom page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BlocksButton showHintForComponent={showHintForComponent} />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full bg-white text-white p-2 rounded shadow-md flex justify-between">
      <Button className="bg-gray-200 text-gray-600">
        <Eye />
      </Button>

      <Sheet>
        <SheetTrigger asChild>
          <Button className="bg-gray-200 text-gray-600">Add Block</Button>
        </SheetTrigger>
        <SheetContent className="w-72">
          <SheetHeader>
            <SheetTitle className="text-center">Add Block</SheetTitle>
            <SheetDescription>
              Add any number of blocks to your custom page.
            </SheetDescription>
          </SheetHeader>
          <BlocksButton showHintForComponent={showHintForComponent} />
        </SheetContent>
      </Sheet>

      <Button className="bg-gray-200 text-gray-600">
        <Settings className="w-5 h-5" />
      </Button>
    </div>
  );
}

type BlocksButtonProps = Pick<ToolbarProps, "showHintForComponent">;

function BlocksButton({ showHintForComponent }: BlocksButtonProps) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-2 gap-4 mt-6 md:mt-0">
      {Object.keys(componentsMap).map((key) => {
        const onClick = () => showHintForComponent(key);

        return <Button onClick={onClick}>{key}</Button>;
      })}
    </div>
  );
}
