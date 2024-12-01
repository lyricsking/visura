import { PageModel } from "~/features/page/models/page.server";

export const seedPages = async () => {
  try {
    await PageModel.updateOne(
      { path: "" },
      {
        metadata: {
          title: "Default Home",
          description: "The default page description.",
        },
        content: { type: "markdown", value: "# Hi there! I am Jamiu Adeniyi." },
        status: "active",
      },
      { upsert: true }
    );

    await PageModel.updateOne(
      { path: "blank" },
      {
        metadata: {
          title: "Blank",
          description: "The default page description.",
        },
        content: {
          type: "yaml",
          value: `# A blank
sections:
  - type: section:
      `,
        },
        status: "active",
      },
      { upsert: true }
    );
    console.log("Page updated successfully");
  } catch (error) {
    console.error("Error seeding page %s", error);
  }
};
