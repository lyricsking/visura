import { IPlugin } from "~/core/plugins";
import { CartIcon } from "./components/CartIcon";

const SubscriptionBox: IPlugin = {
  name: "Blog",
  description: "",
  version: "0.0.1",
  init: function (): void {
    console.log("SubscriptionBox plugin initialized");
  },
  routes: (route) => {},
  headerIcon: CartIcon,
};

export default SubscriptionBox;
