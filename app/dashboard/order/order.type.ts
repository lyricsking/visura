export type OrderType= {
  _id: string,
  items: OrderItem[],
  status: OrderStatus,
}

export type OrderItem = {
  id: string, //  Product id
  quantity: number, //  Product quantity
  isSubscribe: boolean, //  If `true`, the user choose to purchase as subscription and if `false` user is buy one-time.
}

export const OrderStatus = {
  cart: "cart", //  Orders still in cart
  checkout: "checkout", //  Order has been accepted and ready for payment
  completed: "completed", //  Order completed
  inTransit: "inTransit", //  Order is in transit now.
  paid: "paid", // Order has been paid for
  processing: "processing",
}
as
const
export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus]