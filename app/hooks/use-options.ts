import { useFetcher, useSubmit } from "@remix-run/react";

export const useOptions = () => {
  const submit = useSubmit();

  const add = (name: string, value: any, autoload: boolean = false) => {
    submit(
      { name, value, autoload },
      { method: "POST", action: "/api/add-options", navigate: false }
    );
  };

  const save = (name: string, value: any) => {
    submit(
      { name, value },
      { action: "/api/save-options", method: "POST", navigate: false }
    );
  };

  // const saveUserMeta = (key: string, value: any) => {
  //   fetcher.submit({ key: value }, { action: "/api/user-profile" });
  // };

  return { add, save };
};
