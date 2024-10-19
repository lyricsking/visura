import { BlockMetadata } from "~/blocks";
import { findPosts } from "../server/post.server";
import { findTips } from "../server/tips.server";

export default async function blogBlock(): Promise<BlockMetadata> {
  const [tips, posts] = await Promise.all([
    findTips(),
    findPosts({ published: true }),
  ]);

  const blogBlock: BlockMetadata = {
    blockId: "main",
    type: "div",
    props: { className: "" },
    blocks: [
      {
        blockId: "main2",
        type: "div",
        blocks:
          tips &&
          tips.map((tip) => ({
            blockId: "",
            type: "div",
            props: { children: tip.slug },
          })),
      },
    ],
  };

  return blogBlock;
}
