import { cookieStorage } from "~/Shared/utils/cookie";
import { PageProps } from "./components/page";
import { dbClient } from "~/Shared/database/db.server";
import { ObjectId } from "mongodb";

async function getEditPageSession(request: Request) {
  const session = await cookieStorage.getSession(request.headers.get("Cookie"));
  return {
    getPage: () => {
      const page = session.get("page") as PageProps;
      return page;
    },
    setPage: (page: PageProps) => session.set("page", page),
    commit: () => cookieStorage.commitSession(session),
  };
}

async function getPageFromServer(id: string): Promise<PageProps> {
  return dbClient.collection<PageProps>().find<PageProps>({ id });
}

export { getEditPageSession, getPageFromServer };
