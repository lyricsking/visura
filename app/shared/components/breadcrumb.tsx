import { ChevronRightIcon } from "@heroicons/react/16/solid";

export default function Breadcrumb({ breadcrumbs }: { breadcrumbs: any[] }) {
  return (
    <ul className="list-none flex gap-1 font-normal">
      {breadcrumbs.map((breadcrumb: any, index) => (
        <div key={index} className="flex justify-between items-center gap-1">
          {
          index > 0 && index < breadcrumbs.length && (
            <ChevronRightIcon className="text-center h-4 w-4" />
          )
          }
          <li className="inline">{breadcrumb}</li>
        </div>
      ))}
    </ul>
  );
}
