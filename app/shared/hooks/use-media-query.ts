import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);

  function onChange(this: MediaQueryList, ev: MediaQueryListEvent) {
    setValue(ev.matches);
  }

  useEffect(() => {
    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}