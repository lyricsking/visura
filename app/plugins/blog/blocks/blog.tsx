import { BlockMetadata } from "~/blocks";

export default function blogBlock(): BlockMetadata {
  const blogBlock: BlockMetadata = {
    type: "div",
    props: { className: "" },
    blocks: [{ type: "div", props: { children: "HHHHHHHHHHHH" } }],
  };

  return blogBlock;
}
