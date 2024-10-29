import { useEffect, useState } from "react";

export const useIsMobile = (breakpoint = 768) => {
  // const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const handleChnage = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    mediaQuery.addEventListener("change", handleChnage);
    setIsMobile(mediaQuery.matches);

    return () => mediaQuery.removeEventListener("change", handleChnage);
  }, [breakpoint]);

  return isMobile;
};
