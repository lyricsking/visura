export const loader: LoaderFunction = async ({ params, request }) => {
  let uid = params["uid"];
  const session = await getSession(request.headers.get("Cookie"));
  
  let {page, pageCount, question, uid } = getQuestion(session, uid);
  
  if(!question||!uid){
    return redirect("/quiz");
  }
  
  return json({page, pageCount, question, uid})
};
