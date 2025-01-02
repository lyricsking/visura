import { Box, Center, Text } from "@mantine/core";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { ReactNode, Suspense } from "react";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const homepageReqUrl = new URL(`http://localhost:3000/api/pages`);
  homepageReqUrl.searchParams.set("path", "blog");
  // homepageReqUrl.searchParams.set("status", "false");

  const homepage = await (
    await fetch(homepageReqUrl, { method: "GET" })
  ).json();

  return { page: homepage["data"] ? homepage["data"][0] : homepage };
};

export default function Home() {
  const { page } = useLoaderData<typeof loader>();

  let child: ReactNode = (
    <Center h={"100vh"}>
      <Text ta={"center"} size={"xl"} c="dimmed">
        Ops! No homepage configuration found.
      </Text>
    </Center>
  );

  if (page && page.content) {
    child = (
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={import(`../../../../../plugins/blog/routes/blog`)}>
          {(resolvedValue) => (
            <p>{resolvedValue.default({ tips: [], posts: [] })}</p>
          )}
        </Await>
      </Suspense>
    );
  }

  return <Box h={"100vh"}>{child}</Box>;
}
