import {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunction,
  LoaderFunctionArgs,
  json,
} from "@remix-run/node";
import { Link, useLoaderData, useParams, useSubmit } from "@remix-run/react";
import { IPhoneMockup, TabletMockup } from "~/Shared/components/mockup";
import { getEditPageSession, getPageFromServer } from "./pages.server";
import { EditPageSidebar } from "./components/edit.page.sidebar";
import { BlockProps } from "./components/block";
import { DashboardSidebarProps } from "../layout";
import { getTemplate } from "./data/templates";
import { BlockEditorKey } from "./components/block";
import { fonts } from "~/Shared/data/fonts";
import Page from "./components/page";

// Writes the theme state to cookie
export async function action({ request, params }: ActionFunctionArgs) {
  const sectionsSession = await getEditPageSession(request);

  const formData = await request.formData();
  console.log(formData);

  let block: Partial<BlockProps> = {};
  const id = formData.get("id") as string;
  const type = formData.get("type") as BlockEditorKey;
  const attrs = formData.get("attrs") as string;
  const background = formData.get("background") as string;

  if (!block) {
    return json({
      success: false,
      message: `value given is not a valid block value`,
    });
  }

  const sections = sectionsSession.getPage();

  sectionsSession.setPage(sections);
  return json(
    { success: true },
    { headers: { "Set-Cookie": await sectionsSession.commit() } }
  );
}

// read the state from the cookie
export const loader: LoaderFunction = async ({ params, request }) => {
  const edit = params["edit"];

  let page;
  if (edit) page = await getPageFromServer(edit);
  else page = await getEditPageSession(request).getPage();

  return json({ page });
};

export const handle = {
  pageName: "Edit Page",
  breadcrumb: () => {
    const array: React.ReactElement[] = [];
    array.push(<Link to="/dashboard/pages">Pages</Link>);
    array.push(<span>Edit Page</span>);

    return array;
  },
  sidebarContent: (params: DashboardSidebarProps) => (
    <EditPageSidebar {...params} />
  ),
};

export const links: LinksFunction = () => {
  return [...fonts.map((font) => ({ rel: font.rel, href: font.href }))];
};

export default function Edit() {
  const params = useParams();
  const { page } = useLoaderData<typeof loader>();

  const submit = useSubmit();
  // A new blocks value is detected, we should persist to server
  const saveBlock = ({ id, type }: BlockProps) => {
    submit({ id, type }, { action: "/dashboard/pages/edit", method: "post" });
  };

  return (
    <>
      <IPhoneMockup>
        <Page {...page} />
      </IPhoneMockup>
    </>
  );
}
{
  /*<img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mockup-1-light.png"
              className="dark:hidden w-[272px] h-[572px]"
              alt=""
            />
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mockup-1-dark.png"
              className="hidden dark:block w-[272px] h-[572px]"
              alt=""
            />*/
}
