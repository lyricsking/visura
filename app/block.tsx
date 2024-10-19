import { BlockMetadata, Blocks } from "./blocks";

const renderBlock = (block: BlockMetadata): JSX.Element | null => {
  const { type, props, children } = block;
  const Component = Blocks[type];

  if (!Component) return null;

  return (
    <Component {...props}>
      {children && children.map((child, index) => renderBlock(child))}
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
