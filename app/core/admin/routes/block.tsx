import { json, useFetcher, useLoaderData } from "@remix-run/react";
import Button from "~/core/components/button";
import { withContext } from "~/core/utils/context-loader";

const loader = withContext(({ app }) => {
  const page: Page = {
    blocks: [
      {
        id: "",
        type: "text",
        props: {},
      },
    ],
  };

  return json({ blocks: page });
});

export default function CreatePage() {
  const { page } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const addBlock = (type: string) => {
    fetcher.submit({ _action: "add", type: type });
  };

  const updateBlock = () => {};

  return (
    <div>
      <div>
        <Button onClick={() => addBlock("text")}>Add text</Button>
        <Button onClick={() => addBlock("image")}>Add Image</Button>
        <Button onClick={() => addBlock("video")}>Add Video</Button>
      </div>

      <div>{page.blocks.map((block, index) => {})}</div>
    </div>
  );
}
