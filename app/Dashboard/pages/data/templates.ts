import { PageProps } from "../components/page";

const templates: PageProps[] = [
  {
    name: "blank",
    elements: [
      {
        id: "1a",
        type: "Text",
        hide: false,
        blockName: "rosco",
        paddingTop: "10px",
        paddingBottom: "10px",
        props: {
          alignment: "left",
          textType: "text",
          children: "Button",
          size: "xl",
          bold: true,
          italic: true,
          underline: true,
          strikethrough: true,
        },
      },
    ],
  },
];

export function getTemplate(name: string) {
  return templates.find((template) => template.name === name);
}
