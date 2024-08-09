export const action: ActionFunction = async ({ request }) => {
  return logout(request, { redirectTo: "/" });
};
