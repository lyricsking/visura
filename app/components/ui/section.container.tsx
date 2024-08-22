import React from "react";
import { CommonProps } from "~/shared/types/common.props";

type Params = Pick<CommonProps<React.ReactNode>, "children"> & {
  title: string;
  description: string;
};
export default function SectionContainer(params: Params) {
  const { children } = params;

  return (
    <div id="section-container" className="bg-base-100 py-16 sm:py-24">
      <div className="mx-auto text-base-content max-w-7xl px-3 lg:px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-secondary">
            {params.title}
          </p>
          <p className="mt-2 text-lg leading-8">{params.description}</p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-8 lg:mt-16 lg:max-w-4xl">
          {children}
        </div>
      </div>
    </div>
  );
}
