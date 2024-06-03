import { useFetcher } from "@remix-run/react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { Dispatch, PropsWithChildren, SetStateAction } from "react";

const Theme = {
  DARK: "dark",
  LIGHT: "light",
} as const;
type Theme = (typeof Theme)[keyof typeof Theme];

type ThemeContextType = [Theme | null, Dispatch<SetStateAction<Theme | null>>];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const isTheme = (value: unknown) =>
  Object.values(Theme).find((v) => v === value) !== undefined;

const prefersDarkMQ = "(prefers-color-scheme: dark)";
const getSystemTheme = () =>
  window.matchMedia(prefersDarkMQ).matches ? Theme.DARK : Theme.LIGHT;

function ThemeProvider({
  children,
  theme: sTheme,
}: PropsWithChildren<{ theme: Theme | null }>) {
  const [theme, setTheme] = useState<Theme | null>(() => {
    if (sTheme) {
      if (isTheme(sTheme)) {
        return sTheme;
      } else {
        return "dark";
      }
    }

    // there's no way for us to know what the theme should be in this context
    // the client will have to figure it out before hydration.
    if (typeof document === "undefined") {
      return null;
    }

    return getSystemTheme();
  });

  const persistTheme = useFetcher();

  // Flag to identify when this mounted
  const mountRun = useRef(false);

  useEffect(() => {
    // useEffect will run when provider is first mounted,
    // even though no theme change occurred
    if (!mountRun.current) {
      mountRun.current = true;
      return;
    }

    if (!theme) {
      return;
    }

    persistTheme.submit(
      { theme },
      { action: "/theme/update", method: "post" }
    );
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(prefersDarkMQ);
    const handleChange = () => {
      setTheme(mediaQuery.matches ? Theme.DARK : Theme.LIGHT);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export { Theme, ThemeProvider, isTheme, useTheme };
