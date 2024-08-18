import { ActionFunction, json } from "@remix-run/node";
import { getSessionUser, setUnauthUser } from "~/Auth/server/auth.server";
import { ISupplement } from "~/Supplement/supplement.type";
import { commitSession, getSession } from "~/utils/session";
import {
  recommendSupplements,
  createCart,
  getAnswers,
} from "../server/quiz.server";
import { ANSWER_KEY, QIDS_MAP_KEY } from "../utils/constants";
import formDataToObject from "~/utils/form-data-to-object";

export const action: ActionFunction = async ({ request }) => {
  //  Converts the request url to instance of URL for easy manipulation
  let formData = await request.formData();

  const session = await getSession(request.headers.get("Cookie"));

  // const formData = await request.formData();
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
      // session.unset(QIDS_MAP_KEY);
      // session.unset(ANSWER_KEY);

      //  Cache user data in session if not logged in
      let user = await getSessionUser(request);
      if (!user) {
        user = await setUnauthUser(session, {
          firstname: firstname,
          lastname: lastname,
          email: email,
        });
      }

      const headers = {
        "Set-Cookie": await commitSession(session),
      };

      return json({ success: true, cart }, { headers });
    }

    return json({ success: false });
  } catch (error) {
    console.log(error);

    return json({ success: false });
  }
};