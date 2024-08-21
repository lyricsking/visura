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
import { IUserProfile } from "~/User/types/user-profile.type";
import { useEffect } from "react";
// import { UserIcon } from "@heroicons/react/20/solid";

//type Props = ButtonProps;
type Props = {
  profile?: IUserProfile;
};
export default function AccountMenuButton({ profile }: Props) {
  const submit = useSubmit();
  const location = useLocation();
  const navigate = useNavigate();

  let profilePhoto = profile?.photo;

  // useEffect(() => {
  //   alert(profilePhoto);
  // }, []);

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
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* Optionally allow to navigate to dashboard in not already in the the dashboard */}
        {profile && !location.pathname.includes("dashboard") && (
          <DropdownMenuItem
            onSelect={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard
          </DropdownMenuItem>
        )}
        {/* Navigate to support page */}
        <DropdownMenuItem
          onSelect={() => {
            navigate("/support");
          }}
        >
          Support
        </DropdownMenuItem>
        {/* Sign out */}
        {profile ? (
          <DropdownMenuItem
            onSelect={() => {
              submit(null, { method: "POST", action: "/auth/signout" });
            }}
          >
            Sign Out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onSelect={() => {
              navigate("/auth");
            }}
          >
            Sign In
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
