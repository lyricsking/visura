import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { ButtonProps } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown.menu";

type Props = ButtonProps;

export default function AccountMenuButton(props: Props) {
  return (
    <DropdownMenu >
      <DropdownMenuTrigger>
        <EllipsisVerticalIcon className={`h-5 w-5 ${props.className}`} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
