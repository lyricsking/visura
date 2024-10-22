export async function singleton<Value>(
  name: string,
  initializer?: Value | (() => Value) | (() => Promise<Value>)
) {
  const yolo = globalThis as any;
  yolo.__singletons ??= {};

  // Initialize the value if it doesn't exist yet
  if (!yolo.__singletons[name] && initializer) {
    if (typeof initializer === "function") {
      const initValue = (initializer as Function)();
      if (initializer instanceof Promise) {
        yolo.__singletons[name] = await initValue;
      }
      yolo.__singletons[name] = initValue;
    } else {
      yolo.__singletons[name] = initializer;
    }
  }

  // Return the singleton value
  return yolo.__singletons[name] as Value | undefined;
}
