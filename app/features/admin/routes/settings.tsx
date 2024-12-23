import { json, LoaderFunctionArgs } from "react-router";
import {
  Outlet,
  ShouldRevalidateFunctionArgs,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "react-router";
import { IHydratedUser } from "~/core/user/models/user.model";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/shared/components/tabs";

export const handle = {
  pageName: "Settings",
  breadcrumb: {
    id: "settings",
    label: "Settings",
    //path: "/dashboard/settings",
  },
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const tab = new URL(request.url).pathname.split("/")[3] ?? "";

  return { tab: tab };
};

/**
 * By default settings layout route will not revalidate when
 * switching tab, this is RemixJs optimization which prevents
 * leaf route (Outlet) content from updating.
 *
 * @param args `ShouldRevalidateFunctionArgs`
 * @returns `boolean` if the routes should revalidate
 */
export const shouldRevalidate = ({
  currentUrl,
  defaultShouldRevalidate,
  nextUrl,
}: ShouldRevalidateFunctionArgs) => {
  const currentTab = currentUrl.pathname.split("/")[3];
  const nextTab = nextUrl.pathname.split("/")[3];

  if (currentTab !== nextTab) return true;

  return defaultShouldRevalidate;
};

export default function Settings() {
  const { tab } = useLoaderData<typeof loader>();
  const { user }: { user: IHydratedUser } = useOutletContext();

  const navigate = useNavigate();

  const onSettingChange = (newSetting: string) => {
    // alert(JSON.stringify(newSetting, null, 2));
    navigate(`/administration/settings/${newSetting}`);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 sm:gap-8">
      <Tabs defaultValue={tab} onValueChange={onSettingChange}>
        <TabsList className="bg-white border-violet-400 rounded-t-md overflow-x-auto no-scrollbar">
          <TabsTrigger value="" className="capitalize">
            General
          </TabsTrigger>
          <TabsTrigger value="display" className="capitalize">
            Display
          </TabsTrigger>
          <TabsTrigger value="policy" className="capitalize">
            Policy
          </TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="h-fit">
          <Outlet />
        </TabsContent>
      </Tabs>
    </div>
  );
}
