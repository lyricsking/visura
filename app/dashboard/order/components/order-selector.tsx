/**
 * Renders empty response for order or orders
 */
function NoOrder(term: string) {
  return <p>No orders found for <span className="uppercase text-2xl font-bold">{term}</span></p>
}
