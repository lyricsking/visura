import { cookieStorage, session } from "~/shared/utils/cookie";
import { dbClient } from "~/shared/utils/db.server";
import { ObjectId } from "mongodb";
import { Answers } from "./components/quiz.provider";

const recommendationIdKey = "quiz-response";

async function getQuizSessionInstance(request: Request) {
  const vSession = await session(request);
  return {
    getId: () => {
      const id = vSession.get(recommendationIdKey);
      return id;
    },
    setId: (id: any) => vSession.set(recommendationIdKey, id),
    commit: () => cookieStorage.commitSession(vSession),
  };
}

/**
 * Generates recommendation from quiz response, converts the recommendations to order with status cart and returns order id object
 *
 */
async function getOrderId(quizAnswers: Answers): Promise<any> {}

async function getRecommendationById(id: string): Promise<any> {
  return dbClient.collection<any>().find<any>({ _id });
}

async function getRecommendationIdFromSession(request: Request) {
  //  Get cookie instance for quiz
  const quizSession = await getQuizSessionInstance(request);
  //  Get recommendation id from session
  return quizSession.getId();
}

async function prepRecommendationIdForSession(request: Request, id: String) {
  //  Get cookie instance for quiz
  const quizSession = await getQuizSessionInstance(request);
  //  Set recommendation id in session
  quizSession.setId(id);
  //  Commit changes to session
  return await quizSession.commit();
}

export {
  getQuizSessionInstance,
  getOrderId,
  getRecommendationById,
  getRecommendationIdFromSession,
  prepRecommendationIdForSession,
};
