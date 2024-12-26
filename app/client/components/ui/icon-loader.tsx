import { StringColorFormat } from "@faker-js/faker";
import { ComponentProps, Suspense, lazy } from "react";
import { cn } from "~/shared/utils/util";

export type RenderIconProps = {
  icon: string;
  className: string;
};
export const renderIcon = ({ icon, className }: RenderIconProps) => {
  if (icon.startsWith("data:image")) {
    return <img src={icon} alt="icon" className={cn(className)} />;
  } else if (icon.startsWith("lucide-")) {
    return (
      <DynamicLucideIcon
        iconName={icon.replace("lucide-", "")}
        className={className}
      />
    );
  }
  // Add more libraries here as needed...
  return null;
};

// Type for the props accepted by the DynamicLucideIcon component
interface DynamicLucideIconProps extends ComponentProps<"div"> {
  iconName: string;
}

// Utility to load Lucide icons dynamically
const loadLucideIcon = (
  iconName: string
): React.LazyExoticComponent<
  React.FC<React.SVGProps<SVGSVGElement>>
> | null => {
  try {
    // Dynamically import the Lucide icon based on the icon name
    return lazy(() =>
      import("lucide-react").then((module) => {
        const Icon = module[iconName] || module["AlertCircle"];
        return { default: Icon as any }; // Return the icon as default export
      })
    );
  } catch (error) {
    console.error(`Icon ${iconName} not found. Falling back to default icon.`);
    return lazy(() =>
      import(`lucide-react`).then((module) => ({
        default: module["AlertCircle"], // Default fallback icon
      }))
    );
  }
};
// Component to render the Lucide icon dynamically
const DynamicLucideIcon = ({ iconName, className }: DynamicLucideIconProps) => {
  const IconComponent = loadLucideIcon(iconName);

  if (!IconComponent) return null;

  return (
    <Suspense fallback={<span>Loading...</span>}>
      <IconComponent className={className} />
    </Suspense>
  );
};

export default DynamicLucideIcon;
