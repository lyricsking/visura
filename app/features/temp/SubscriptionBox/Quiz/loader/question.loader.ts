import { LoaderFunction, redirect, json } from "react-router";
import { getSession } from "~/shared/utils/session";
import { getQuestion } from "../server/quiz.server";

export const loader: LoaderFunction = async ({ params, request }) => {
  let uid = params["uid"];
  if (!uid) return redirect("/quiz");

  const session = await getSession(request);

  let rQuestion = await getQuestion(session, uid);
  if (!rQuestion) return redirect("/quiz");

  const { answer, page, pageCount, question, uid: currentUId } = rQuestion;
  if (!question || !currentUId) {
    return redirect("/quiz");
  }

  return json({
    answer,
    page,
    pageCount,
    question,
    uid: currentUId,
  });
};
