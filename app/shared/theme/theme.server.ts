import { createCookieSessionStorage } from "@remix-run/node";
import { cookieStorage } from "../utils/cookie";
import { Theme, isTheme } from "./theme.provider";

async function getThemeSession(request: Request) {
  const session = await cookieStorage.getSession(request.headers.get("Cookie"));
  return {
    getTheme: () => {
      const themeValue = session.get("theme");
      return isTheme(themeValue) ? themeValue : null;
    },
    setTheme: (theme: Theme) => session.set("theme", theme),
    commit: () => cookieStorage.commitSession(session),
  };
}

export { getThemeSession };
