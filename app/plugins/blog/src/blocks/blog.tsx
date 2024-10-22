import { BlockMetadata } from "~/core/blocks";
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
    props: { className: "flex flex-col items-start" },
    blocks: [
      {
        blockId: "main2",
        type: "div",
        props: {
          className: "w-full bg-cover bg-center",
          style: { backgroundImage: `url('/images/soccer-pitch.jpg')` },
        },
        blocks: [
          {
            blockId: "",
            type: "div",
            props: {
              className: "bg-gray-700/20",
            },
            blocks: [
              {
                blockId: "",
                type: "div",
                props: {
                  className:
                    "mx-auto max-w-3xl text-center px-6 py-16 sm:py-20 lg:px-8 lg:py-24",
                },
              },
            ],
          },
        ],
      },
    ],
  };

  return blogBlock;
}
