import { APP_NAME, HOMEPATH_NAME } from "~/app";
import { OptionModel } from "~/core/options/models/option.model";

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

    await OptionModel.updateOne(
      { name: APP_NAME },
      { value: "App Name" },
      { upsert: true }
    );
    console.log("Homepath updated successfully");
  } catch (error) {
    console.error("Error seeding options %s", error);
  }
};
