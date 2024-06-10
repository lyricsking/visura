import { ActionFunctionArgs, json } from "@remix-run/node";
import { Theme, isTheme } from "~/shared/components/ThemeProvider";
import { getBlocksSession } from "~/shared/theme.server";

// Writes the theme state to cookie
export async function action({ request }: ActionFunctionArgs) {
  const blockSession = await getBlocksSession(request);
  const formData = await request.formData();
  const blocks = formData.get("blocks") as Block[];

  if (!isTheme(theme)) {
    return json({
      success: false,
      message: `theme value of ${theme} is not a valid theme`,
    });
  }

  blockSession.setTheme(theme);
  return json(
    { success: true },
    { headers: { "Set-Cookie": await blockSession.commit() } }
  );
}
