export type MaybeAsyncFunction<TArgs extends any[], TReturn> = (
  ...args: TArgs
) => TReturn | Promise<TReturn>;
