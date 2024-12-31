import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { request } from "http";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {

  const pageReqUrl = new URL(`http://localhost:3000/api/pages/${id}`);

  const foundPage = await (await fetch(pageReqUrl, { method: "GET" })).json();
  console.log(foundPage);

  // Ensures the the fetched page is valid, otherwise return a default page object
  if (foundPage && foundPage.error) {
    const currentUrl = new URL(request.url);
    currentUrl.pathname = "dashboard/builder";

    return redirect(currentUrl.toString());
  } else {
    page = foundPage;
  }

  return { page: page, all: allPages };
};

export default function Home() {
  return <>he</>;
}
