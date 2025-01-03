import { Box, Center, Text } from "@mantine/core";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ReactNode, ComponentType } from "react";
import visuraConfig from "visura.config";
import { getRoutes } from "~/core/route";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const routes = getRoutes(visuraConfig.plugins);

  const route = routes.find((route) => route.path == "/blog");

  return { path: route?.path, metadata: route?.metadata };
};

export default function Home() {
  const { path } = useLoaderData<typeof loader>();

  const routes = getRoutes(visuraConfig.plugins);
  const page = routes.find((route) => route.path == path);

  let child: ReactNode = (
    <Center h={"100vh"}>
      <Text ta={"center"} size={"xl"} c="dimmed">
        Ops! No homepage configuration found.
      </Text>
    </Center>
  );

  if (page && page.component) {
    const Comp = page.component as ComponentType;

    // child = (
    //   <Suspense fallback={<div>Loading...</div>}>
    //     <Await resolve={import(`../../../../../plugins/blog/routes/blog`)}>
    //       {(resolvedValue) => (
    //         <p>{resolvedValue.default({ tips: [], posts: [] })}</p>
    //       )}
    //     </Await>
    //   </Suspense>
    // );

    child = <Comp />;
  }

  return <Box h={"100vh"}>{child}</Box>;
}
