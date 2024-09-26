const viteDevServer =
  process.env.NODE_ENV === "production"
    ? undefined
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      );

async function getBuild() {
  return viteDevServer
    ? await viteDevServer.ssrLoadModule("virtual:remix/server-build")
    : await import("../build/server/index");
}

const build = await getBuild();

const app = await build.entry.module.createApp(build, viteDevServer);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Express server listening at http://localhost:${port}`)
);
