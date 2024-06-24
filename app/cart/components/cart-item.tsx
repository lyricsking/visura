import type { IItem as OrderItem } from "~/dashboard/order/order.type";

export default function CartItem({ item }: { item: OrderItem }) {
  return (
    <div>
      <div>{JSON.stringify(item, null, 2)}</div>
    </div>
  );
}
