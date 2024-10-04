import { json } from 'remix';
import { AppContext } from '~/core/context';
import { LoaderFunction } from 'remix';

// Higher-order function to wrap the loader and pass config
export function withConfig(callback: (config: any) => Promise<Response> | Response): LoaderFunction {
  return async () => {
    const appContext = AppContext.getInstance();
    const appConfig = appContext.getAppConfig();

    // Pass the config to the callback and return the final response
    return callback(appConfig);
  };
}
