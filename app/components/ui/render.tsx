import {
  ComponentProps,
  createElement,
  JSX,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
} from "react";

type RenderFunction = <
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>
>(
  type: T,
  props?: T extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[T]
    : ComponentProps<T>,
  children?: ReactNode
) => ReactElement | null;

const render: RenderFunction = (type, props, children) => {
  //  const { type, ...props } = block;
  //  const Component: any = Blocks[type as keyof typeof Blocks];
  return createElement(type, props, children);
};

// // Function to handle dynamic onClick actions
// const handleOnClick = ({ type, data }: OnClickEvent) => {
//   const navigate = useNavigate();
//   switch (type) {
//     case "navigation":
//       return () => navigate("");
//     case "alert":
//       return () => alert("");
//     default:
//       return undefined;
//   }
// };

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

export default render;
