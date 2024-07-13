import { ComponentProps, ComponentPropsWithRef } from "react";
import { cn } from "~/shared/utils";

export type FeaturesParams = ComponentPropsWithRef<"div"> & {
  id: string;
  heading?: string;
  subheading?: string;
  description?: string;
};

export function Features({
  id,
  heading,
  subheading,
  description,
  className,
  children,
  style,
}: FeaturesParams) {
  return (
    <div
      id={id}
      className={cn("bg-base-100 py-24 sm:py-32", className)}
      style={style}
    >
      <div className="mx-auto text-base-content max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          {heading && (
            <h2 className="text-accent font-semibold leading-7">{heading}</h2>
          )}
          {subheading && (
            <p className="mt-2 text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
              {subheading}{" "}
            </p>
          )}
          {description && (
            <p className="mt-6 text-lg leading-8">{description}</p>
          )}
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 text-base-content lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {children}
          </dl>
        </div>
      </div>
    </div>
  );
}

export type FeatureItemType = ComponentProps<"div"> & {
  feature: {
    name: string;
    description: string;
    icon: any;
  };
};
export function FeatureItem({
  className,
  feature: { icon: Icon, name, description },
}: FeatureItemType) {
  return (
    <div key={name} className={cn("relative pl-16", className)}>
      <dt className="font-semibold leading-7 text-secondary">
        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        {name}
      </dt>
      <dd className="mt-2 text-base leading-7">{description}</dd>
    </div>
  );
}
