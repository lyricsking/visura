import { APP_NAME, DISPLAY_KEY } from "~/app";
import { OptionModel } from "~/core/option/models/option.model";

export const seedOptions = async () => {
  try {
    await OptionModel.updateOne(
      { name: DISPLAY_KEY },
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
