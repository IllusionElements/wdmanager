export const lazy = <
  M extends Record<string, (...args: any[]) => any>,
  K extends keyof M = "default"
>(
  lazyLoad: () => Promise<M>,
  moduleName: K
) => {
  return async (...args: ArgumentType<M[K]>) => {
    const importedModule = await lazyLoad()
    return importedModule[moduleName](...args) as ReturnType<
      M[K]
    > extends Promise<infer U>
      ? U
      : Promise<any>
  }
}
