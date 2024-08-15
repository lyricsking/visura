export const action: ActionFunction = async ({ request }) => {
  const url = new URL(request.url);
  const session = await getSession(request.headers.get("Cookie"));

  //  Retrieve the submitted form quiz answers as json object
  const {uid, answer} = await request.json();
  let uid = await saveQuizAnswer(session, uid, answer);
  return json({ success: true, uid }, { 
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
};