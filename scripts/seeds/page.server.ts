import { PageModel } from "~/core/page/models/page.server";

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
      },
      { upsert: true }
    );

    await PageModel.updateOne(
      { path: "blank" },
      {
        metadata: {
          title: "Default Home",
          description: "The default page description.",
        },
        content: {
          type: "yaml",
          value: `sections:
          - type: section
            props:
              blocks:
                - type: text
                  props:
                    text: Welcome to My Website
                    as: 'p'
                    class: "italic"

                - type: text
                  props:
                    text: I am Jamiu
                    as: 'p'
                    class: "font-bold"
        `,
        },
        isTemplate: true,
        isActive: false,
      },
      { upsert: true }
    );

    console.log("Page updated successfully");
  } catch (error) {
    console.error("Error seeding page %s", error);
  }
};
