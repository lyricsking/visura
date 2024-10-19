import { BlockMetadata } from "~/blocks";

export default function blogBlock(): BlockMetadata {
  const blogBlock: BlockMetadata = {
    id: "main",
    type: "div",
    props: { className: "" },
    blocks: [{ id: "main2", type: "div", props: { children: "HHHHHHHHHHHH" } }],
  };

  return blogBlock;
}
