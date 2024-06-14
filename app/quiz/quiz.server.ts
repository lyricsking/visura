import { cookieStorage , session} from "~/shared/utils/cookie";
import { PageProps } from "./components/page";
import { dbClient } from "~/shared/utils/db.server";
import { ObjectId } from "mongodb";

const recommendationIdKey = "quiz-response";

async function getQuizSessionInstance(request: Request) {
  return {
    getId: () => {
      const id = session.get(recommendationIdKey);
      return id;
    },
    setId: (id: any) => session.set(recommendationIdKey, id),
    commit: () => cookieStorage.commitSession(session),
  };
}

/**
 * Generates recommendation from quiz response, converts the recommendations to order with status cart and returns order id object
 *
 */
async function getOrderId(quizAnswers: any): Promise<any> {
  
}

async function getRecommendationById(id: string): Promise<any> {
  return dbClient.collection<any>().find<any>({ _id });
}

async function getRecommendationIdFromSession(request: Request) {
  //  Get cookie instance for quiz
  const quizSession= await getQuizSessionInstance(request)
  //  Get recommendation id from session
  return quizSession.getId()
}

async function prepRecommendationIdForSession(request: Request, id: String) {
  //  Get cookie instance for quiz
  const quizSession= await getQuizSessionInstance(request)
  //  Set recommendation id in session
  quizSession.setId(id)
  //  Commit changes to session
  return await quizSession.commit()
}

export { getQuizSessionInstance, getOrderId, getRecommendationById, getRecommendationIdFromSession, prepRecommendationIdForSession };
