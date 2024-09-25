type RouteType =  "app"|"admin";

const routes: Record<RouteType, Route[]> = {};

const homePaths: Record<string, string> = {};

export function addRoute(type: RouteType, route: Route){
  routes = {
    [type]: {
      ...routes[type],
      route
    }
  }
}

export function findRoute(type: RouteType, path?: string){
  const typeRoutes = routes[type];
  
  if(!typeRoutes) return undefined;
  
  if(!path) return typeRoutes;
  
  return typeRoutes.find((route ) => route.path === path);
}

export function addHomepagePath(name: string, path: string){
  if(!homePaths[name]){
    homePaths[name] = path;
  }
}