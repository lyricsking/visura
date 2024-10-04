// Higher-order function to wrap the loader and pass config
export function withConfig(callback: (config: any) => Promise<Response> | Response): LoaderFunction {
  return async () => {
    const appContext = singleton<AppContext>("app");
    const appConfig = appContext.get("");

    // Pass the config to the callback and return the final response
    return callback(appConfig);
  };
}
