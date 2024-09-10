import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "@remix-run/react";
import Button from "~/components/button";

export function CartIcon() {
  let navigate = useNavigate();
  let goTocart = () => {
    navigate("/cart");
  };
  return (
    <Button
      variant={"text"}
      size={"icon"}
      radius={"none"}
      onClick={goTocart}
      className="max-h-12 p-2"
    >
      <ShoppingCartIcon className="h-6 w-6" />
    </Button>
  );
}
