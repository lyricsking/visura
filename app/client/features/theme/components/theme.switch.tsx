import { Theme, useTheme } from "./ThemeProvider";
import Button from "./ui/Button";
import { SunIcon, MoonIcon } from "@heroicons/react/16/solid";

export function ThemeSwitch() {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };

  return theme ? (
    <Button size={"icon"} variant={"text"} onClick={toggleTheme}>
      {theme === "light" ? (
        <SunIcon className="h-xs w-xs" />
      ) : (
        <MoonIcon className="h-xs w-xs" />
      )}
    </Button>
  ) : null;
}
