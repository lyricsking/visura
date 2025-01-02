import { Button, Divider } from "@mantine/core";
import { ActionFunctionArgs, LoaderFunction, redirect } from "@remix-run/node";
import {
  Form,
  useFetcher,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import { ArrowLeft, ArrowRight, ArrowRightFromLine } from "lucide-react";
import { useEffect } from "react";
import { Input } from "~/client/components/input";
import { useToast } from "~/client/hooks/use-toast";
import {
  authenticate,
  isAuthenticated,
  REDIRECT_URL,
  getAuthErrorKey,
} from "~/core/auth/server/auth.server";
import { isAuthUser } from "~/core/auth/utils/helper";
import { getSession, commitSession } from "~/core/utils/session";

export const action = async ({ request }: ActionFunctionArgs) => {
  return await authenticate("form", request);
};

export const loader: LoaderFunction = async ({ request }) => {
  const isAuth = await isAuthenticated(request);

  const session = await getSession(request);
  if (isAuth && typeof isAuth !== "string" && isAuthUser(isAuth)) {
    return redirect(session.get(REDIRECT_URL) || "/");
  }

  const error = session.get(getAuthErrorKey());
  console.log("error", error);

  if (error) {
    return Response.json(
      { error },
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      }
    );
  } else return Response.json({});
};

export default function Signin() {
  const { error } = useLoaderData<typeof loader>();
  const { appname }: { appname: string } = useOutletContext();
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        description: error.message,
        position: "topRight",
      });
    }
  }, [error]);

  const fetcher = useFetcher();
  const isSubmitting = fetcher.state !== "idle";

  return (
    <div className="flex flex-col w-full bg-gray-100 py-8 px-6">
      <div className="max-w-sm md:max-w-lg mx-auto bg-white p-6 sm:p-12 md:border md:shadow-md">
        <div className="mt-0 flex flex-col items-center">
          <img
            className="h-12 w-12 hidden"
            src="/illustrations/avatar.svg"
            alt={appname + " Logo"}
          />

          <h2 className="mt-12 text-center text-3xl font-extrabold text-gray-900">
            Welcome back
          </h2>
        </div>
        <div className="w-full flex-1 mt-8">
          <div className="flex flex-col items-center">
            <Form action="/auth/google" method="POST" className="w-full">
              <Button
                type="submit"
                maw={"250"}
                my={"sm"}
                mx="auto"
                size="md"
                fullWidth
                className="transition-all duration-300 ease-in-out"
              >
                <div className="bg-white p-2 rounded-full">
                  <svg className="w-4" viewBox="0 0 533.5 544.3">
                    <path
                      d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                      fill="#4285f4"
                    />
                    <path
                      d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                      fill="#34a853"
                    />
                    <path
                      d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                      fill="#fbbc04"
                    />
                    <path
                      d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                      fill="#ea4335"
                    />
                  </svg>
                </div>
                <span className="ml-4">Sign In with Google</span>
              </Button>
            </Form>

            {/* <button className="hidden w-full font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
              <div className=" bg-white p-1 rounded-full">
                <svg className=" w-6" viewBox="0 0 32 32">
                  <path
                    fillRule="evenodd"
                    d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z"
                  />
                </svg>
              </div>
              <span className="ml-4">Sign in with GitHub</span>
            </button>
          </div> */}

            <Divider
              orientation="horizontal"
              label="Or sign in with e-mail"
              labelPosition="center"
              size={"md"}
              my={"lg"}
              color={"red"}
            />

            <div className="mx-auto">
              <fetcher.Form method="post">
                <Input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  name="userId"
                  type="text"
                  placeholder="Email"
                />
                <Input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <Button
                  type="submit"
                  className="transition-all duration-300 ease-in-out"
                  maw={"250"}
                  my={"sm"}
                  mx="auto"
                  fullWidth
                  disabled={isSubmitting}
                >
                  <ArrowRightFromLine />
                  <span className="ml-3">
                    {isSubmitting ? "Signing in" : "Sign In"}
                  </span>
                </Button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  By continuing, you agree to have read, understood and accepted{" "}
                  {appname}'s{" "}
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Privacy Policy
                  </a>
                </p>
              </fetcher.Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
