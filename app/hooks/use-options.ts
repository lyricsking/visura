import { useFetcher, useNavigation, useSubmit } from "@remix-run/react";

export const useOptions = () => {
  const fetcher = useFetcher();

  const add = (name: string, value: any, autoload: boolean = false) => {
    fetcher.submit(
      { name, value, autoload },
      { method: "POST", action: "/api/options" }
    );
  };

  const save = (name: string, value: any) => {
    fetcher.submit({ name, value }, { action: "/api/options", method: "POST" });
  };

  // const saveUserMeta = (key: string, value: any) => {
  //   fetcher.fetcher.submit({ key: value }, { action: "/api/user-profile" });
  // };

  return { add, save, isSubmitting: fetcher.state !== "idle" };
};
