import { commitSession, getSession } from "../../../shared/utils/session";
import { Theme, isTheme } from "./theme.provider";

async function getThemeSession(request: Request) {
  const session = await getSession(request);
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
