import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BlockProps } from "~/dashboard/pages/components/block";
import Section, { SectionProps } from "~/dashboard/pages/components/section";

export type LoaderData = {
  sections: SectionProps[];
}; 
export const loader = () => {
  const sections: SectionProps[] = [
    {
      background: "",
      blocksProps: [
        {
          id: "",
          element: "Button",
          background: "",
          attrs: []
        }
      ] as BlockProps[],
    },
  ];

  return json<LoaderData>({ sections });
};

/** */
export default function Page() {
  // Get route data from loader
  const { sections } = useLoaderData() as LoaderData

  // Return route view markup
  return sections.map((section: SectionProps) => <Section {...section} />);
}
