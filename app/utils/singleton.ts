export function singleton<Value>(
  name: string,
  value?: () => Value
): Value | undefined {
  const yolo = globalThis as any;
  yolo.__singletons ??= {};

  // If value is provided, initialize it if it doesn't exist
  if (value && !yolo.__singletons[name]) {
    yolo.__singletons[name] = value();
  }

  // Return the existing instance, or undefined if not yet initialized
  return yolo.__singletons[name];
}
