import { UserCircleIcon } from "@heroicons/react/16/solid";
import { BellIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { AuthUser } from "~/Auth/types/auth-user.type";
import AccountMenuButton from "~/components/ui/account-menu-button";
import { IHydratedUser } from "~/User/models/user.model";

type HeaderSearchProps = {
  profile: IHydratedUser["profile"];
};
export default function HeaderIcons(props: HeaderSearchProps) {
  return (
    <div className="flex items-center justify-between gap-x-2 px-1">
      <div className="flex items-center space-x-4 px-1 border rounded-md shadow-sm">
        <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
        <input
          type="text"
          placeholder="Search tickets, users, FAQs, Knowledgebase, Reports, etc...."
          className="px-3 py-2 rounded-md focus:outline-none"
        />
      </div>

      <div className="flex-none flex items-center">
        <BellIcon className="w-6 h-6 text-gray-500" />
        <AccountMenuButton profile={props.profile} />
      </div>
    </div>
  );
}
