export const action: ActionFunction = async ()=>{
  //  Converts the request url to instance of URL for easy manipulation
  const url = new URL(request.url);
  
  if (
    answers &&
    url.searchParams.has(ACTION_KEY) &&
    url.searchParams.get(ACTION_KEY) === "submit"
  ) {
    try {
      const supplements: ISupplement[] = await recommendSupplements(answers);

      if (Array.isArray(supplements) && supplements.length > 0) {
        const params = {
          name: answers["name"],
          email: answers["email"],
          supplements,
        };

        console.log("params", params);

        await createCart(params);

        //  Remove quiz session data, as we no longer need it.
        //session.unset(GIDS_MAP_KEY);
        //session.unset(ANSWER_KEY);

        //  Cache user data in session if not logged in
        await setUnauthUser(session, {
          // name: params.name,
          email: params.email,
        });

        const headers = {
          "Set-Cookie": await commitSession(session),
        };

        return json({ success: true, data: { answers } }, { headers });
      }
    } catch (error) {
      console.log(error);

      return json({ success: false, data: { answers } });
    }
  }
}