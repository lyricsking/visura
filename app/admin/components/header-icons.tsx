import { BellIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import AccountMenuButton from "~/components/ui/account-menu-button";
import { IHydratedUser } from "~/core/user/models/user.model";

type HeaderSearchProps = {
  user: IHydratedUser;
};

export default function HeaderIcons(props: HeaderSearchProps) {
  return (
    <div className="grid grid-flow-col grid-cols-[1fr_auto] items-center gap-x-1 px-1">
      <div className="grid grid-cols-[auto_1fr] items-center sm:px-4 sm:border sm:rounded-md">
        <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
        <div className="hidden sm:inline-block w-full px-3 py-2 text-gray-500 truncate">
          Search tickets, users, FAQs, Knowledgebase, Reports, etc....
        </div>
      </div>

      <BellIcon className="w-6 h-6 text-gray-500" />
      <AccountMenuButton user={props.user} />
    </div>
  );
}
