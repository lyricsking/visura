import { createRequestHandler } from "@remix-run/express";
import { type ServerBuild } from "@remix-run/node";
import compression from "compression";
import express from "express";
import morgan from "morgan";
import connectToDatabase from "~/database/db.server.js";
import { loadPlugins } from "~/plugin.js";

const viteDevServer =
  process.env.NODE_ENV === "production"
    ? undefined
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      );

const build = viteDevServer
  ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
  : // @ts-expect-error - the file might not exist yet but it will
    // eslint-disable-next-line import/no-unresolved
    await import("../build/server/index.js");
    
const app = build.entry.module.createApp(build, viteDevServer)

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Express server listening at http://localhost:${port}`)
);
