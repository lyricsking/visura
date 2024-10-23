import { useNavigate } from "@remix-run/react";
import { BlockMetadata, Blocks, OnClickEvent } from "../../blocks";

const renderBlock = (block: BlockMetadata): JSX.Element | null => {
  const { blockId, type, props, blocks } = block;
  const Component = Blocks[type];

  if (!Component) return null;

  const attr = props || {};
  const { children, ...otherProps } = attr;

  const newProps = {
    ...otherProps,
    onClick: () => otherProps.onClick && handleOnClick(otherProps.onClick),
  };

  return (
    <Component key={blockId} {...newProps}>
      {children
        ? children
        : blocks && blocks.map((child, index) => renderBlock(child))}
    </Component>
  );
  // switch (type) {
  //   case "div":
  //   case "header":
  //   case "main":
  //   case "footer":
  //   case "section":
  //     return createElement(
  //       type,
  //       { className: props.className },
  //       children.map((child, index) => reanderBlock(child))
  //     );
  //   case "h1":
  //   case "p":
  //     return createElement(type, { key: props.text }, props.text);
  //   // case "Button":

  //   default:
  //     return null;
  // }
};

// Function to handle dynamic onClick actions
const handleOnClick = ({ type, data }: OnClickEvent) => {
  const navigate = useNavigate();
  switch (type) {
    case "navigation":
      return () => navigate("");
    case "alert":
      return () => alert("");
    default:
      return undefined;
  }
};

// export interface Page {
//   blocks: { id: string; type: string; props: any }[];
// }

// export default interface Block<T> {
//   type: string; // Unique type identifier for the block
//   props: T; // Props specific to the block
//   render: (props: T) => JSX.Element; // Function to render the block
//   version: number; // Version number for consistency
// }

// const c: Page = {
//   blocks: [
//     {
//       id: "",
//       type: "t",
//       props: undefined,
//     },
//   ],
// };

// export const blocks = (app: AppContext) => {
//   app.configure(text);
// };

export default renderBlock;
