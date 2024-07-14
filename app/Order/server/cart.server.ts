import mongoose from "mongoose";
import OrderModel, { IOrderModel } from "~/dashboard/order/order.model";
import type { IItem } from "~/dashboard/order/order.type";
import {
  connectToDatabase,
  disconnectDatabase,
} from "~/shared/database/db.server";

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
    disconnectDatabase();
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
  }finally{
    disconnectDatabase()
  }
};

export const applyDiscount = async (orderId, code): Promise<void> => {
  try {
    await connectToDatabase();
    
    const discount = await OrderDiscount.findOne({code});
    
    if(!discount) return;
    
    await OrderModel.updateOne({ _id: orderId, status: "cart"}, {
      $set: { discount: {type:discount.type, value:discount.value} }
    });
  } catch (err) {
    console.error("Error applying discount on order", err);
  }finally{
    disconnectDatabase();
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
          ...(purchaseMode && { "purchaseMode": purchaseMode }),
          updatedAt: new Date() 
        },
      },
      { new: true }
    ).exec()
    console.log("Item updated successfully.");
  } catch (err) {
    console.error("Error updating item in cart:", err);
  }finally{
    disconnectDatabase();
  }
};

export const deleteCart = async (
  email: string,
): Promise<void> => {
  try {
    await connectToDatabase();
    
    await OrderModel.deleteOne(
      { email: email, status: "cart"} );
    console.log("Item deleted successfully.");
  } catch (err) {
    console.error("Error deleting item in cart:", err);
  }finally{
    disconnectDatabase();
  }
};
