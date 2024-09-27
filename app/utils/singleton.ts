export function singleton<Value>(
  name: string,
  value?: (() => Value) | Value
): Value | undefined {
  const yolo = global as any;
  yolo.__singletons ??= {};

  // If value is provided, initialize it if it doesn't exist
  if (value && !yolo.__singletons[name]) {
    if (typeof value === "function") yolo.__singletons[name] = (value as Function)();
    else yolo.__singletons[name] = value; 
  }

  // Return the existing instance, or undefined if not yet initialized
  return yolo.__singletons[name];
}


export function singleton<Value>(name: string, initializer?: () => Value) {
  const yolo = globalThis as any;
  yolo.__singletons ??= {};

  // Initialize the value if it doesn't already exist and an initializer is provided
  if (!yolo.__singletons[name] && initializer) {
    yolo.__singletons[name] = initializer();
  }

  // Return an object with get and set methods
  return {
    get: (): Value | undefined => yolo.__singletons[name],

    set: (newValue: Value): void => {
      yolo.__singletons[name] = newValue;
    },
  };
}
