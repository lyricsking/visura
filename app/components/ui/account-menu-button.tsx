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
import { useFetcher } from "react-router-dom";
import { useNavigate } from "@remix-run/react";

type Props = ButtonProps;

export default function AccountMenuButton(props: Props) {
  const feather = useFetcher();
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2 bg-gray-200 rounded-full">
        <UserCircleIcon className="h-6 w-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            navigate("/support");
          }}
        >
          Support
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            feather.submit(null, { method: "POST", action: "/auth/signout" });
          }}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
