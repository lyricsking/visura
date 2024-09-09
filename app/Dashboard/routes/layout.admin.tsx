import { NavLink, Outlet, useMatches } from "@remix-run/react";
import { ScrollArea, ScrollBar } from "~/components/scrollable.area";
import { cn } from "~/utils/util";

export default function AdminLayout() {
  const matches = useMatches();
  const parentRoute: any = matches.at(-2);
  const submenu = parentRoute?.handle?.submenu || [];

  return (
    <div className="w-full mx-auto sm:w-full grid px-4 sm:px-8">
      <div className="grid border rounded-md p-4 md:p-8 gap-4 md:grid-cols-[150px_1fr] md:gap-6 lg:grid-cols-[280px_1fr]">
        <div className="grid bg-white rounded-md">
          <nav className="max-w-xl h-min grid items-center grid-flow-col auto-cols-auto md:grid-flow-row md:auto-rows-auto gap-4 py-2 px-4 md:py-12 md:px-6 text-sm">
            <ScrollArea className="whitespace-nowrap" type="scroll">
              <div className="grid grid-flow-col auto-cols-auto md:grid-flow-row md:auto-rows-auto items-center gap-4 divide-x md:divide-x-0">
                {submenu.map((item: any) => (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    end
                    className={({ isActive }) =>
                      cn("w-full text-center", {
                        "font-semibold text-primary bg-slate-200 p-2 rounded-md":
                          isActive,
                      })
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </nav>
        </div>

        <ScrollArea className="h-screen w-full" type="auto">
          <div className="w-full py-8 px-4 md:py-12 md:px-6 bg-white rounded-md">
            <Outlet />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
