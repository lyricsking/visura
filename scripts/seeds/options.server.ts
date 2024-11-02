import { DisplayOptions } from "~/admin/type/options";
import { APP_NAME } from "~/app";
import {
  DISPLAY_OPTION_KEY,
  OptionModel,
} from "~/core/option/models/option.model";

export const seedOptions = async () => {
  try {
    const displayOptionValue: DisplayOptions = {
      homepageDisplay: {
        type: "static",
        path: "",
      },
    };

    await OptionModel.updateOne(
      { name: DISPLAY_OPTION_KEY },
      { value: displayOptionValue },
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
