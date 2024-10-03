export function singleton<Value>(name: string, initializer?: (() => Promise<Value>) | Value): Value | undefined {
  const yolo = global as any;
  yolo.__singletons ??= {};

  // Initialize the value if it doesn't exist yet
  if (!yolo.__singletons[name] && initializer) {
    if (typeof initializer === 'function') {
      yolo.__singletons[name] = (async () => await (initializer as Function)())();
    } else {
      yolo.__singletons[name] = initializer;
    }
  }

  // Return the singleton value
  return yolo.__singletons[name] ;
}
