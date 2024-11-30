import mongoose, { model, Model, Schema } from "mongoose";
import { IPage } from "../types/page";

type IPageModel = Model<IPage>;
const pageSchema = new Schema<IPage, IPageModel>({
  path: { type: String, unique: true },
  default: { type: Boolean, default: false },
  metadata: { type: Schema.Types.Mixed, required: true },
  content: { type: Schema.Types.Mixed, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  isTemplate: { type: Boolean, default: false },
  status: { type: Schema.Types.Mixed, default: "draft" },
});

export const PageModel: IPageModel =
  mongoose.models.Page || model<IPage, IPageModel>("Page", pageSchema);

export const defaultPage: Pick<IPage, "content"> = {
  content: {
    type: "yaml",
    value: `# Array of sections
sections:
  - type: section
    props:
      blocks:
        - type: text
          props:
            text: Sample text block
            as: 'p'
            class: "italic"
`,
  },
};
