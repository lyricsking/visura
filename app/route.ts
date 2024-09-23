import { defineRoutes } from "vite-plugin-remix";

export default defineRoutes((route) => {
  // Define all your static routes first
  // Homepage 
  route("", "Home/routes/layout.tsx", {id:"home"}, () => {
    route("", "Home/routes/index.tsx", { index: true });
  });
  
  // Auth routes
  route("auth", "auth/routes/layout.tsx", () => {
    route("", "auth/routes/signin.tsx", { index: true });
    route("signup", "auth/routes/signup.tsx");
    route("google/callback", "auth/routes/google-callback.tsx");
    route("google/signin", "auth/routes/google-signin.tsx");
    route("signout", "auth/routes/signout.tsx");
  });

  // Catch-all route for plugin routes
  route("*", "routes/catchAll.tsx");
});
