export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  // Handle server-side logic for form data here, if needed
  return json(data);
};

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const questionId = url.searchParams.get("id");
  
  if(!questionId) redirect("/");
  
  return json({ questionId });
};

export default function Quiz() {
  const { questionId } = useLoaderData();
  
  return <DynamicForm questionId={questionId} />;
}