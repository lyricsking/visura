import { BellIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "~/components/input";
import AccountMenuButton from "~/components/ui/account-menu-button";
import { IHydratedUser } from "~/User/models/user.model";

type HeaderSearchProps = {
  user: IHydratedUser;
};
export default function HeaderIcons(props: HeaderSearchProps) {
  return (
    <div className="flex items-center justify-between gap-x-2 px-1">
      <div className="flex items-center space-x-2 px-1 border rounded-md">
        <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
        <Input
          type="text"
          placeholder="Search tickets, users, FAQs, Knowledgebase, Reports, etc...."
          className="w-full px-3 py-2 border-none focus:outline-none"
        />
      </div>

      <div className="flex-none flex soace-x-2 items-center">
        <BellIcon className="w-6 h-6 text-gray-500" />
        <AccountMenuButton user={props.user} />
      </div>
    </div>
  );
}
