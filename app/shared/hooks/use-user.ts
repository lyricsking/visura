import { useFetcher } from "react-router";
import { HydratedDocument } from "mongoose";
import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  IUser,
  IUserMethods,
  IUserVirtuals,
} from "~/core/user/models/user.model";

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
