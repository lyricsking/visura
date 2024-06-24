import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import QuizHandler from "./components/quiz-handler";

export const action = async ({ request }:ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  // Handle server-side logic for form data here, if needed
  return json(data);
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const questionId = url.searchParams.get("id");
  
  if(!questionId) return redirect("/");
  
  return json({ questionId });
};

export default function Quiz() {
  const { questionId } = useLoaderData<typeof loader>();
  
  return <QuizHandler questionId={questionId} />;
}