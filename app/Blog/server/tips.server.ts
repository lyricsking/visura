import TipsModel from "../models/tips.model";
import { ITips } from "../types/tips.type";

export const createTips = async (data: ITips) => {
  try {
    const tips = await TipsModel.create(data);
    console.log(tips);

    return tips;
  } catch (error) {
    console.log(error);

    throw error;
  }
};
