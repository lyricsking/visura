import { DisplayOptions } from "~/features/admin/type/options";
import { APP_NAME } from "~/app";
import { OptionModel } from "~/features/option/models/option.server";
import { DISPLAY_OPTION_KEY } from "~/features/option/types/option";

export const seedOptions = async () => {
  try {
    const displayOptionValue: DisplayOptions = {
      homepage: {
        type: "static",
        path: "/",
      },
    };

    await OptionModel.updateOne(
      { name: DISPLAY_OPTION_KEY },
      { value: displayOptionValue, autoload: true },
      { upsert: true }
    );

    await OptionModel.updateOne(
      { name: APP_NAME },
      { value: "RemixWP" },
      { upsert: true }
    );

    console.log("Homepath updated successfully");
  } catch (error) {
    console.error("Error seeding options %s", error);
  }
};
