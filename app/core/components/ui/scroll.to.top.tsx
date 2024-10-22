import { ArrowLongUpIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

export default function ScrollToTop(): JSX.Element {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const backToTop = () => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {showButton && (
        <button
          type="button"
          onClick={backToTop}
          className=" bg-slate-400 rounded-full fixed bottom-4 right-4 p-4"
        >
          <ArrowLongUpIcon
            className="h-6 w-6 text-slate-50"
            aria-hidden="true"
          />
        </button>
      )}
    </>
  );
}
