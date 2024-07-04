export async function checkout(orderId: string) {
  //  Update record whose id equals `order.id` and status is `cart`
  orderId;
  //  Init payment instance
}

export async function getOrders() {}

const generateDummyOrder = (): IOrder => {
  const items: IItem[] = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    quantity: faker.number.int({ min: 1, max: 10 }),
  }));

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return {
    userId: new mongoose.Types.ObjectId(),
    status: faker.helpers.arrayElement(Object.values(OrderStatus)) as OrderStatus,
    items,
    totalPrice,
    paymentDetails: {
      method: faker.finance.transactionType(),
      transactionId: faker.datatype.uuid(),
    },
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  } as IOrder;
};

const generateDummyOrders = (count: number): IOrder[] => {
  return Array.from({ length: count }, generateDummyOrder);
};