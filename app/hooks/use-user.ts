import { useFetcher } from "@remix-run/react";
import { HydratedDocument } from "mongoose";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { IUserMethods, IUserVirtuals } from "~/core/User/models/user.model";
import { IUser } from "~/core/User/types/user.types";

export const useUser = ():
  | HydratedDocument<IUser, IUserMethods & IUserVirtuals>
  | undefined => {
  const fetcher = useFetcher<
    HydratedDocument<IUser, IUserMethods & IUserVirtuals>
  >({ key: "user-fetcher" });

  const loadCallback = useCallback(() => fetcher.load("/user"), []);

  let data = (fetcher.data as any)?.user as
    | HydratedDocument<IUser, IUserMethods & IUserVirtuals>
    | undefined;

  useEffect(() => {
    loadCallback();
  }, [loadCallback]);

  return data;
};
