import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/shared/components/dropdown.menu";
import { useLocation, useNavigate, useSubmit } from "@remix-run/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { renderIcon } from "./icon-loader";
import { Menu } from "~/shared/types/menu";
import { IHydratedUser } from "~/core/user/models/user.model";

//type Props = ButtonProps;
type Props = {
  user?: IHydratedUser;
  menu?: Menu[];
};
export default function AccountMenuButton({ menu, user }: Props) {
  const submit = useSubmit();
  const location = useLocation();
  const navigate = useNavigate();

  let profilePhoto = user?.photo;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="max-h-12 p-2">
        {user && profilePhoto ? (
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
            const icon = menuItem.icon;
            return (
              <DropdownMenuItem
                key={menuItem.id}
                onSelect={() => {
                  navigate(menuItem.path);
                }}
              >
                {icon && renderIcon({ icon: icon, className: "w-6 h-6 mr-4" })}
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
  */}
        {/* Sign out */}
        {user ? (
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
