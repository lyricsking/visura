import {} from "@heroicons/react/24/outline";
import { Pencil2Icon, CheckboxIcon, ArchiveIcon } from "@radix-ui/react-icons";

import {
  FeatureItem,
  FeatureItemType,
  Features,
  FeaturesParams,
} from "~/core/components/ui/features";
import { findFontByName } from "~/core/utils/fonts";

const feature: FeaturesParams = {
  id: "explanation",
  heading: "How it works?",
  subheading: "Get a personalized health pack in 3 simple steps.",
};

const featureItems: FeatureItemType["feature"][] = [
  {
    name: "Take the Quiz",
    description:
      "Take the health and wellness consultation quiz. Our specialist will recommend a personalized pack based on your responses and budget.",
    icon: Pencil2Icon,
  },
  {
    name: "Acknowledge your subscription",
    description: "Acknowledge your subcriorion and make your first payment.",
    icon: CheckboxIcon,
  },
  {
    name: "Receive your subscription",
    description:
      "Update your delivery address and instructions for your subscription orders.",
    icon: ArchiveIcon,
  },
];

export default function Explanation() {
  const font = findFontByName("Raleway");

  return (
    <Features
      {...feature}
      className="py-16 sm:py-24"
      style={{ fontFamily: font!.value }}
    >
      {featureItems.map((featureItem) => (
        <FeatureItem
          key={featureItem.name}
          feature={featureItem}
          className=""
        />
      ))}
    </Features>
  );
}
