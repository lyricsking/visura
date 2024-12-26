import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { OrderStatus, type IItem, type IOrder } from "../types/order.type";

export async function checkout(orderId: string) {
  //  Update record whose id equals `order.id` and status is `cart`
  orderId;
  //  Init payment instance
}

export async function getOrders() {}

const generateDummyOrder = (): IOrder => {
  const items: IItem[] = Array.from(
    { length: faker.number.int({ min: 2, max: 7 }) },
    () => {
      const price = parseFloat(faker.commerce.price());
      const quantity = faker.number.int({ min: 1, max: 10 });

      return {
        productId: new mongoose.Types.ObjectId(),
        name: faker.commerce.productName(),
        price: price,
        quantity: quantity,
        total: price * quantity,
      };
    }
  );

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return {
    name: "",
    email: "",
    status: faker.helpers.arrayElement(
      Object.values(OrderStatus)
    ) as OrderStatus,
    items,
    totalPrice,
    paymentDetails: {
      method: faker.finance.transactionType(),
      transactionId: faker.string.uuid(),
    },
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  } as IOrder;
};

export const generateDummyOrders = (count: number): IOrder[] => {
  return Array.from({ length: count }, generateDummyOrder);
};
