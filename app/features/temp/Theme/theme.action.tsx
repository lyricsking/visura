import { ActionFunctionArgs, json } from "react-router";
import { getThemeSession } from "./theme.server";
import { Theme, isTheme } from "./theme.provider";

// Writes the theme state to cookie
export async function action({ request }: ActionFunctionArgs) {
  const themeSession = await getThemeSession(request);
  const formData = await request.formData();

  const theme = formData.get("theme") as Theme;
  if (!isTheme(theme)) {
    return json({
      success: false,
      message: `theme value of ${theme} is not a valid theme`,
    });
  }

  themeSession.setTheme(theme);
  return json(
    { success: true },
    { headers: { "Set-Cookie": await themeSession.commit() } }
  );
}
