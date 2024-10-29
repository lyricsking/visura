import { useFetcher } from "@remix-run/react";

export const useOptions = () => {
  const fetcher = useFetcher();

  const saveOption = (key: string, value: any) => {
    fetcher.submit({ key: value }, { action: "/api/options" });
  };

  const saveUserMeta = (key: string, value: any) => {
    fetcher.submit({ key: value }, { action: "/api/user-profile" });
  };

  return { saveOption: saveOption, saveUserMeta: saveUserMeta };
};
