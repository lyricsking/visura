import mongoose from "mongoose";
import Order from "~/dashboard/order/order.type";
import type { IItem, IOrder } from "~/dashboard/order/order.type";

/**
 * Converts the recommendations to order with status cart
 * and returns order id.
 *
 * @param userId
 */
export const getCartByUserId = async (
  userId: mongoose.Types.ObjectId
): Promise<IOrder | null> => {
  try {
    const cart = await Order.findOne({ userId, status: "cart" }).exec();
    return cart;
  } catch (err) {
    console.error("Error retrieving cart:", err);
    return null;
  }
};

export const addItemsToCart = async (
  userId: mongoose.Types.ObjectId,
  newItems: IItem[]
): Promise<void> => {
  try {
    await connectToDatabase()
    
    await Order.updateOne(
      { userId, status: "cart" },
      {
        $push: { items: { $each: newItems } },
        $inc: {
          totalPrice: newItems.reduce((acc, item) => acc + item.total, 0),
        },
        $setOnInsert: { createdAt: new Date() },
        $set: { updatedAt: new Date() },
      },
      { upsert: true, new: true }
    ).exec();
    console.log("Items added to cart successfully.");
  } catch (err) {
    console.error("Error adding items to cart:", err);
  } finally {
    disconnectDatabase()
  }
};

export const addItemToCart = async (
  userId: mongoose.Types.ObjectId,
  newItem: IItem
): Promise<void> => {
  try {
    await Order.findOneAndUpdate(
      { userId, status: "cart" },
      {
        $push: { items: newItem },
        $inc: { totalPrice: newItem.total },
        $setOnInsert: { createdAt: new Date() },
        $set: { updatedAt: new Date() },
      },
      { upsert: true, new: true }
    );
    console.log("Item added to cart successfully.");
  } catch (err) {
    console.error("Error adding item to cart:", err);
  }
};

export const updateCartItem = async (
  userId: mongoose.Types.ObjectId,
  productId: mongoose.Types.ObjectId,
  quantityIncrement: number,
  priceIncrement: number
): Promise<void> => {
  try {
    await Order.findOneAndUpdate(
      { userId, status: "cart", "items.productId": productId },
      {
        $inc: {
          "items.$.quantity": quantityIncrement,
          "items.$.total": priceIncrement,
          totalPrice: priceIncrement,
        },
        $set: { updatedAt: new Date() },
      },
      { new: true }
    );
    console.log("Item updated successfully.");
  } catch (err) {
    console.error("Error updating item in cart:", err);
  }
};
