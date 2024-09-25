export const loader = async (arg: LoaderFunctionArgs) => {
  const homepagePath = config.homepage;
  const route = findRoute("app", homepagePath)
  
  if(!route || Array.isArray(route)){
    return null;
  }
  
  const routeData = route.loader(arg);
  
  return json({data: routeData, path: homepagePath})
}

export default function Index() {
  const {data, path} = useLoaderData<typeof loader>();
  
  const route = findRoute("app", path)
  if(!path || !route || Array.isArray(route)){
      return <></>;
  }
  
  const Component = route.component;

  return <Component data={data} />
}