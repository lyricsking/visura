import { Schema, model, Document, Types, Model, models } from "mongoose";
import { IStaff, StaffRole } from "../types/staff.type";
import Staff from "../models/staff.model";

export const getStaffByUserId = async (userId: Types.ObjectId) => {
  try {
    const staff = await Staff.findOne({ userId }).exec();
    console.log("Staff", staff);

    return staff;
  } catch (error) {
    throw error;
  }
};
