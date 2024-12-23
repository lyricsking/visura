import { json, useFetcher, useLoaderData } from "react-router";
import Button from "~/shared/components/button";

const loader = ({}) => {
  const page = {
    blocks: [
      {
        id: "",
        type: "text",
        props: {},
      },
    ],
  };

  return json({ page: page });
};

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

      {/* <div>{page.blocks.map((block, index) => {})}</div> */}
    </div>
  );
}
