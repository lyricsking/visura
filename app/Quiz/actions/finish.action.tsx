import { ActionFunction, json } from "@remix-run/node";
import { ISupplement } from "~/Supplement/supplement.type";
import { commitSession, getSession } from "~/utils/session";
import {
  recommendSupplements,
  createCart,
  getAnswers,
} from "../server/quiz.server";
import { ANSWER_KEY, QIDS_MAP_KEY } from "../utils/constants";
import formDataToObject from "~/utils/form-data-to-object";
import {
  getAuthUser,
  getUserFromSession,
  setAuthUser,
} from "~/Auth/server/auth.server";

export const action: ActionFunction = async ({ request }) => {
  //  Converts the request url to instance of URL for easy manipulation
  let formData = await request.formData();
  //  Get the session
  const session = await getSession(request);
  //  Get form data formObject
  const formObject = formDataToObject(formData);

  let { firstname, lastname, email, subscribe } = formObject;

  try {
    let answers = getAnswers(session);

    const supplements: ISupplement[] = await recommendSupplements(answers);

    if (Array.isArray(supplements) && supplements.length > 0) {
      const params = {
        name: firstname + " " + lastname,
        email,
        supplements,
      };

      let cart = await createCart(params);

      //  Remove quiz session data, as we no longer need it.
      session.unset(QIDS_MAP_KEY);
      session.unset(ANSWER_KEY);

      await setAuthUser(session, { email: email });

      return json({ success: true, cart });
    }

    return json({ success: false });
  } catch (error) {
    console.log(error);

    return json({ success: false });
  }
};
