import { commitSession, getSession } from "../utils/cookie";
import { Theme, isTheme } from "./theme.provider";

async function getThemeSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  return {
    getTheme: () => {
      const themeValue = session.get("theme");
      return isTheme(themeValue) ? themeValue : null;
    },
    setTheme: (theme: Theme) => session.set("theme", theme),
    commit: () => commitSession(session),
  };
}

export { getThemeSession };
