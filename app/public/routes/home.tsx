import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { IPage, PageContentType } from "~/page/types/page";
import { renderPage } from "~/components/ui/render-page";
import { getAppContext } from "~/app";
import { PageModel } from "~/page/models/page.server";

export const loader = async (args: LoaderFunctionArgs) => {
  const app = await getAppContext();

  let page: IPage | undefined;
  let loaderData: any;
  const homepage = app.homepageConfig;

  if (homepage.type === "static") {
    if (process.env.NODE_ENV != "production")
      page = new PageModel({
        metadata: {
          title: "Default Home",
          description: "The default page description.",
        },
        content: { type: "markdown", value: "# Hi there! I am Jamiu Adeniyi." },
      });
    else page = (await PageModel.findOne({ path: homepage.path })) as IPage;
  } else if (homepage.type === "plugin") {
    page = app.findRoute(homepage.path!) as IPage;
    loaderData = page?.loader && (await page.loader({ ...args, app }));
  } else {
    throw new Error("Homepage improperly configured.");
  }

  return json({
    path: page?.path || homepage.path,
    metadata: page?.metadata,
    data: loaderData,
    content: page?.content,
  });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  // Access the appConfig from the loader's returned data
  if (data) {
    const { metadata } = data;

    return [
      { title: metadata?.title },
      { name: "description", content: metadata?.["description"] },
    ];
  }

  return [];
};

export default function Home() {
  const { data, path, content } = useLoaderData<typeof loader>();

  return renderPage(path, content as PageContentType, data);
}
