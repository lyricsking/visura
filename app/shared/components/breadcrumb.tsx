import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router";

export type BreadcrumbType = {
  id: string | number;
  label: string;
  path?: string;
};

type BreadcrumbProps = {
  breadcrumbs: BreadcrumbType[];
};

export default function Breadcrumb({ breadcrumbs }: BreadcrumbProps) {
  return (
    <ul className="list-none flex gap-1 font-normal">
      {breadcrumbs.map((breadcrumb, index) => (
        <div
          key={breadcrumb.id}
          className="flex justify-between items-center gap-1"
        >
          {index > 0 && index < breadcrumbs.length && (
            <ChevronRightIcon className="text-center h-4 w-4" />
          )}
          <li className="inline">
            {breadcrumb.path ? (
              <Link to={breadcrumb.path}>{breadcrumb.label}</Link>
            ) : (
              breadcrumb.label
            )}
          </li>
        </div>
      ))}
    </ul>
  );
}
