import { PageModel } from "~/core/pages/models/page.model";

export const seedPages = async () => {
  try {
    await PageModel.updateOne(
      { path: "" },
      {
        metadata: {
          title: "Default Home",
          description: "The default page description.",
        },
        content: { type: "markdown", value: "# Hi there!" },
      },
      { upsert: true }
    );
    console.log("Page updated successfully");
  } catch (error) {
    console.error("Error seeding page %s", error);
  }
};
