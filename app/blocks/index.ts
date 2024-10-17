import AppContext from "~/app";
import text from "./text";

export const blocks = (app: AppContext) => {
  app.configure(text);
};
