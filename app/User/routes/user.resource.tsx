export const loader: LoaderFunction = async ({params, request}) => {
  await isAuthenticated(request)
  
  let id = params["id"];
  const user = await getUserById(new Types.ObjectId(id));
  
  if(user) {
    return json({user})
  }
  
  return null;
}