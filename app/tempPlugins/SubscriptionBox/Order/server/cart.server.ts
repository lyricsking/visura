import mongoose from "mongoose";
import { IItem, IOrder } from "../types/order.type";
import { Order, type OrderModel } from "../models/order.model";
import { Discount } from "../models/discount.model";
import { IAddress } from "../types/address.type";
import { AddressModel } from "../models/address.model";

/**
 * Converts the recommendations to order with status cart
 * and returns order id.
 *
 * @param email
 */
export const getCartByEmailId = async (
  email: string
): Promise<IOrder | null> => {
  try {
    const cart = await Order.findOne({
      email: email,
      // email: "asaajay775@gmail.com",
      status: "cart",
    }).exec();
    //const cart = generateDummyOrders(1);
    console.log("Cart", cart);

    return cart;
  } catch (err) {
    console.error("Error retrieving cart:", err);
    throw err;
  }
};

export const addItemsToCart = async (
  name: string,
  email: string,
  newItems: IItem[]
): Promise<IOrder> => {
  try {
    const order = await Order.findOneAndUpdate(
      { name, email, status: "cart" },
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
    return order;
  } catch (err) {
    console.error("Error adding items to cart:", err);
    throw err;
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

export const applyDiscount = async ({
  orderId,
  code,
}: {
  orderId: any;
  code: any;
}): Promise<void> => {
  try {
    const discount = await Discount.findOne({ code });

    if (!discount) return;

    await Order.updateOne(
      { _id: orderId, status: "cart" },
      {
        $set: { discount: { type: discount.type, value: discount.value } },
      }
    );
  } catch (err) {
    console.error("Error applying discount on order", err);
  }
};

export const updateCartItem = async (
  email: string,
  productId: mongoose.Types.ObjectId,
  quantity?: number,
  purchaseMode?: string
): Promise<void> => {
  try {
    await Order.findOneAndUpdate(
      { email, status: "cart", "items.productId": productId },
      {
        $set: {
          ...(quantity && { "items.$.quantity": quantity }),
          ...(purchaseMode && { "items.$.purchaseMode": purchaseMode }),
          updatedAt: new Date(),
        },
      },
      { new: true }
    ).exec();
    console.log("Item updated successfully.");
  } catch (err) {
    console.error("Error updating item in cart:", err);
  }
};

export const updateCartAddress = async ({
  orderId,
  address,
}: {
  orderId: string;
  address: IAddress;
}): Promise<void> => {
  try {
    await Order.findOneAndUpdate(
      {
        id: new mongoose.Types.ObjectId(orderId),
        status: "cart",
      },
      {
        $set: {
          address: address,
          updatedAt: new Date(),
        },
      },
      { new: true }
    ).exec();
    console.log("Item updated successfully.");
  } catch (err) {
    console.error("Error updating item in cart:", err);
  }
};

export const deleteCart = async (email: string): Promise<void> => {
  try {
    await Order.deleteOne({ email: email, status: "cart" });
    console.log("Item deleted successfully.");
  } catch (err) {
    console.error("Error deleting item in cart:", err);
  }
};

export const updatePaymentMethod = async ({
  orderId,
  paymentMethod,
}: {
  orderId: string;
  paymentMethod: string;
}): Promise<void> => {
  try {
    await Order.findOneAndUpdate(
      { _id: orderId, status: "cart" },
      {
        $set: {
          "paymentDetails.method": paymentMethod,
          updatedAt: new Date(),
        },
      },
      { new: true }
    ).exec();
    console.log("Order payment updated successfully.");
  } catch (err) {
    console.error("Error updating order payment method:", err);
  }
};
