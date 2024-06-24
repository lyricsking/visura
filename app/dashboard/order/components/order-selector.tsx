/**
 * Renders empty response for order or orders
 */
export function NoOrder({ term }: { term: string }) {
  return (
    <p>
      No orders found for{" "}
      <span className="uppercase text-2xl font-bold">{term}</span>
    </p>
  );
}
