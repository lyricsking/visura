import mongoose from "mongoose";
import OrderModel, { IOrderModel } from "../model/order.model";
import { connectToDatabase, disconnectDatabase } from "~/Shared/database/db.server";
import { IItem } from "../type/order.type";
import DiscountModel from "../model/discount.model";

/**
 * Converts the recommendations to order with status cart
 * and returns order id.
 *
 * @param emailId
 */
export const getCartByEmailId = async (
  emailId: string
): Promise<IOrderModel| null > => {
  try {
    await connectToDatabase();
    const cart = await OrderModel.findOne({
      //email: emailId,
      email: "asaajay775@gmail.com",
      status: "cart",
    }).exec();
    //const cart = generateDummyOrders(1);
    console.log("Cart", cart);

    return cart;
  } catch (err) {
    console.error("Error retrieving cart:", err);
    throw err;
  } finally {
    await disconnectDatabase();
  }
};

export const addItemsToCart = async (
  name: string,
  email: string,
  newItems: IItem[]
): Promise<void> => {
  try {
    await connectToDatabase();

    await OrderModel.updateOne(
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
  } catch (err) {
    console.error("Error adding items to cart:", err);
  } finally {
    await disconnectDatabase();
  }
};

export const addItemToCart = async (
  userId: mongoose.Types.ObjectId,
  newItem: IItem
): Promise<void> => {
  try {
    await connectToDatabase();
    
    await OrderModel.findOneAndUpdate(
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
  } finally {
    await disconnectDatabase()
  }
};

export const applyDiscount = async ({ orderId,code}:{ orderId:any, code:any }): Promise<void> => {
  try {
    await connectToDatabase();
    
    const discount = await DiscountModel.findOne({code});
    
    if(!discount) return;
    
    await OrderModel.updateOne({ _id: orderId, status: "cart"}, {
      $set: { discount: {type:discount.type, value:discount.value} }
    });
  } catch (err) {
    console.error("Error applying discount on order", err);
  } finally {
    await disconnectDatabase();
  }
}

export const updateCartItem = async (
  email: string,
  productId: mongoose.Types.ObjectId,
  quantity?: number,
  purchaseMode?: string
): Promise<void> => {
  try {
    await connectToDatabase();
    
    await OrderModel.findOneAndUpdate(
      { email, status: "cart", "items.productId": productId },
      {
        $set: {
          ...(quantity && { "items.$.quantity": quantity }),
          ...(purchaseMode && { "items.$.purchaseMode": purchaseMode }),
          updatedAt: new Date() 
        },
      },
      { new: true }
    ).exec()
    console.log("Item updated successfully.");
  } catch (err) {
    console.error("Error updating item in cart:", err);
  } finally {
    await disconnectDatabase();
  }
};

export const deleteCart = async (
  email: string,
): Promise<void> => {
  try {
    await connectToDatabase();

    await OrderModel.deleteOne({ email: email, status: "cart" });
    console.log("Item deleted successfully.");
  } catch (err) {
    console.error("Error deleting item in cart:", err);
  } finally {
    await disconnectDatabase();
  }
};

export const updatePaymentMethod = async (
  {orderId, paymentMethod}:{orderId: string,
  paymentMethod: string,
}): Promise<void> => {
  try {
    await connectToDatabase();
    
    await OrderModel.findOneAndUpdate(
      { _id: orderId, status: "cart" },
      {
        $set: {
          "paymentDetails.method": paymentMethod,
          updatedAt: new Date() 
        },
      },
      { new: true }
    ).exec()
    console.log("Order payment updated successfully.");
  } catch (err) {
    console.error("Error updating order payment method:", err);
  } finally {
    await disconnectDatabase();
  }
};
