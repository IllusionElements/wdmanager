export const pick = <
  Context,
  T,
  K extends keyof T,
  X extends (o: Pick<T, K>[K], _: any, ctx: Context) => any = never
>(
  k: K,
  transform?: X
) => (
  o: T,
  ...args: [any, Context]
): typeof transform extends undefined ? Pick<T, K>[K] : ReturnType<X> => {
  if (transform) {
    return transform(o[k], ...args)
  }
  //@ts-ignore
  return o[k]
}
