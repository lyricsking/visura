export function singleton<Value>(name: string, initializer?: (() => Value)|Value) {
  const yolo = global as any;
  yolo.__singletons ??= {};

  // Initialize the value if it doesn't already exist and an initializer is provided
  if (!yolo.__singletons[name]&&initializer) {
    if (typeof initializer === "function") yolo.__singletons[name] = (initializer as Function)();
    else yolo.__singletons[name] = initializer;
  }

  // Return an object with get and set methods
  return {
    get: (): Value | undefined => yolo.__singletons[name],

    set: (newValue: Value): void => {
      yolo.__singletons[name] = newValue;
    },
  };
}
