import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/dropdown.menu";
import { useLocation, useNavigate, useSubmit } from "@remix-run/react";
import { UserCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import { IUserProfile } from "~/core/User/types/user-profile.type";
import { useEffect } from "react";
import { IHydratedUser } from "~/core/User/models/user.model";
import { UserType } from "~/core/User/types/user.types";
import { Menu } from "~/utils/menu";
import { ReceiptRefundIcon } from "@heroicons/react/20/solid";

//type Props = ButtonProps;
type Props = {
  user?: IHydratedUser;
  menu?: Menu[];
};
export default function AccountMenuButton({ menu, user }: Props) {
  const submit = useSubmit();
  const location = useLocation();
  const navigate = useNavigate();

  let profile = user?.profile;
  let profilePhoto = profile?.photo;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="max-h-12 p-2">
        {profile && profilePhoto ? (
          <img
            src={profilePhoto}
            alt="User account menu icon"
            className="w-6 h-6 rounded-full"
          />
        ) : (
          <UserCircleIcon className="w-6 h-6 text-gray-500" />
          // <UserIcon className="w-6 h-6 text-gray-500" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        {/*  <DropdownMenuLabel>Account</DropdownMenuLabel>*/}
        <DropdownMenuSeparator />
        {/* Optionally allow to navigate to dashboard if not already in the the dashboard */}
        {menu &&
          menu.map((menuItem) => {
            const Icon = menuItem.icon;
            return (
              <DropdownMenuItem
                key={menuItem.id}
                onSelect={() => {
                  navigate(menuItem.path);
                }}
              >
                {Icon && <Icon className="w-6 h-6 mr-4" />}
                {menuItem.label}
              </DropdownMenuItem>
            );
          })}
        {/* Navigate to support page */}
        {/*  <DropdownMenuItem
          onSelect={() => {
            navigate("/support");
          }}
        >
          Support
        </DropdownMenuItem>
  */}{" "}
        {/* Sign out */}
        {profile ? (
          <DropdownMenuItem
            onSelect={() => {
              submit(null, { method: "POST", action: "/auth/signout" });
            }}
          >
            Sign out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onSelect={() => {
              navigate("/auth");
            }}
          >
            Sign in
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
