import { UserCircleIcon } from "@heroicons/react/20/solid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/dropdown.menu";
import { ButtonProps } from "~/components/button";
import { authenticator } from "~/Auth/server/auth.server";
import { useFetcher } from "react-router-dom";
import { LOGOUT_ACTION } from "../utils/constants";

type Props = ButtonProps;

export default function AccountMenuButton(props: Props) {
  
  const feather = useFetcher();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2 bg-gray-200 rounded-full">
        <UserCircleIcon className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            feather.submit({ _action: LOGOUT_ACTION }, { method: "POST" });
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
