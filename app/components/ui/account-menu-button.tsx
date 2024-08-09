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
import { LOGOUT_ACTION } from "../utils/constants";

type Props = ButtonProps;

export default function AccountMenuButton(props: Props) {
  
  const feather = useFetcher();
  const navigate = useNavigate();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2 bg-gray-200 rounded-full">
        <UserCircleIcon className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => {
          navigate("/support")
        }}>
          Support
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            feather.submit(null, { method: "POST", action: "/auth/logout"});
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
