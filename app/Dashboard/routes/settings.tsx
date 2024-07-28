import { LoaderFunctionArgs } from "@remix-run/node";
import {
  useLoaderData,
  useNavigate,
  useOutletContext,
  useParams,
} from "@remix-run/react";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/tabs";

import ProfileSettings from "../components/profile-settings";
import NotificationSettings from "../components/notification-settings";
import DisplaySettings from "../components/display-settings";
import PrivacySettings from "../components/privacy-settings";
import OrderSettings from "~/Order/components/order-settings";
import HealthPreferences from "../components/health-settings";
import HealthSettings from "../components/health-settings";
import PaymentSettings from "~/Transaction/components/payment-settings";

export const handle = {
  pageName: "Settings",
  breadcrumb: {
    id: "settings",
    label: "Settings",
    //path: "/dashboard/settings",
  },
};

const settingsKeys = {
  account: ProfileSettings,
  notifications: NotificationSettings,
  display: DisplaySettings,
  privacy: PrivacySettings,
  order: OrderSettings,
  health: HealthSettings,
  payment: PaymentSettings,
};

export default function Settings() {
  const { orders } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const params = useParams();

  const status = params["screen"] || "account";
  const onStatus = (newStatus: string) => {
    navigate(`/dashboard/settings/${newStatus}`);
  };

  const { sidebarMenuRef }: any = useOutletContext();
  if (sidebarMenuRef) {
    sidebarMenuRef.current = () => null;
  }

  return (
    <Tabs defaultValue={status} onValueChange={onStatus}>
      <TabsList className="border-violet-400 overflow-x-auto no-scrollbar">
        {Object.keys(settingsKeys).map((key, index) => (
          <TabsTrigger key={key} value={key} className="capitalize">
            {key}
          </TabsTrigger>
        ))}
      </TabsList>
      {Object.keys(settingsKeys).map((key, index) => {
        const Tag = settingsKeys[key as keyof typeof settingsKeys];

        return (
          <TabsContent key={key} value={key} className="h-fit">
            {<Tag />}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const orders = [
    {
      id: "",
      date: new Date(),
      total: 5999.99,
      status: "pending",
    },
  ];
  return { orders };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const actionType = formData.get('_action');
  
  if (actionType === "") {
    //await updateUserData(formData);
  } else if (actionType === 'changePassword') {
    //await changeUserPassword(formData);
  } else if (actionType === 'deleteAccount') {
    //await deleteUserAccount(formData.get('userId'));
    return redirect('/logout');
  }else if(actionType === ""){}
  
};
