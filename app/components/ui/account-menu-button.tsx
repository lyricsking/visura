import { UserCircleIcon } from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/dropdown.menu";
import { ButtonProps } from "~/components/button";
import { useLocation, useNavigate, useSubmit } from "@remix-run/react";
import { useUser } from "~/hooks/use-user";
import { UserIcon } from "@heroicons/react/24/outline";

type Props = ButtonProps;

export default function AccountMenuButton(props: Props) {
  const submit = useSubmit();
  const location = useLocation();
  const navigate = useNavigate();

  let data: any = useUser();
  let profilePhoto = data?.profile?.photo;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="max-h-12 p-1 border border-gray-500 rounded-full">
        {data && profilePhoto ? (
          <img
            src={profilePhoto}
            alt="User account menu icon"
            className="w-6 h-6 rounded-full"
          />
        ) : (
          <UserIcon className="w-6 h-6" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* Optionally allow to navigate to dashboard in not already in the the dashboard */}
        {data && !location.pathname.includes("dashboard") && (
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
        {data ? (
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
