import { HOMEPATH_NAME } from "~/app";
import { OptionModel } from "~/core/models/option.model";

export const seedOptions = async () => {
  try {
    await OptionModel.updateOne(
      { name: HOMEPATH_NAME },
      {
        value: {
          type: "custom",
          path: "",
        },
      },
      { upsert: true }
    );
    console.log("Homepath updated successfully");
  } catch (error) {
    console.error("Error seeding options %s", error);
  }
};
