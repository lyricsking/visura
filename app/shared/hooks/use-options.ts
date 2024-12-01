import { useFetcher, useNavigation, useSubmit } from "@remix-run/react";
import { useEffect } from "react";
import { useAppContext } from "~/shared/utils/app-context";

export const useOptions = () => {
  const fetcher = useFetcher();

  const add = (name: string, value: any, autoload: boolean = false) => {
    fetcher.submit(
      { name, value, autoload },
      { method: "POST", action: "/api/options", encType: "application/json" }
    );
  };

  const save = (name: string, value: any) => {
    fetcher.submit(
      { name, value },
      { action: "/api/options", method: "POST", encType: "application/json" }
    );
  };

  const app = useAppContext();
  useEffect(() => {
    if (fetcher.data) {
      app.config;
    }
  }, [fetcher.data]);

  // const saveUserMeta = (key: string, value: any) => {
  //   fetcher.fetcher.submit({ key: value }, { action: "/api/user-profile" });
  // };

  return { add, save, isSubmitting: fetcher.state !== "idle" };
};
