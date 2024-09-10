import { Plugin } from "~/core/plugins";
import { CartIcon } from "./components/CartIcon";

const SubscriptionBox: Plugin = {
  name: "Blog",
  version: "0.0.1",
  init: function (): void {
    console.log("SubscriptionBox plugin initialized");
  },
  routes: (route) => {},
  headerIcon: CartIcon,
};

export default SubscriptionBox;
