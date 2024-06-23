import {  OrderItem, OrderStatus, OrderType } from ".";
import * as lo from "lodash"

/**
 * Converts the recommendations to order with status cart
 * and returns order id.
 * 
 * @param supplements
 */
export async function createCart(supplements: Supplement[]) {
  
}

export async function checkout(order: OrderType) {
  const { id, ...obj } = order;
  //  Update record whose id equals `order.id` and status is `cart` 
  
  //  Init payment instance
  
}

export async function createSubscription(order: OrderItem[]) {
  //  Get items indicated for subscription
  const toSubscribe=order.filter((item) => item.isSubscribe);
  //   Create subscription in database
}