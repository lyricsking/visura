import { Model, Schema } from "mongoose";
import { IPage } from "../types/page";

type IPageModel = Model<IPage>;
const pageSchema = new Schema<IPage, IPageModel>({
  me,
});
