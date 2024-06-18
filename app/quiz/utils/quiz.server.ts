import { dbClient } from "~/shared/utils/db.server";
import { createCookie } from "@remix-run/node";
import { Answers } from "./quiz";

export const quizPrefs = createCookie("quizPrefs", {
  maxAge: 10,
});

/**
 * Generates recommendation from quiz response, converts the recommendations to order with status cart and returns order id object
 *
 */
export async function getOrderId(quizAnswers: Answers) {}

export async function getRecommendationById(id: string) {
  dbClient;
}
