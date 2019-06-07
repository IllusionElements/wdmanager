const TTL = 100000
const moduleCache = new Map()
export const lazy = <
  M extends Record<string, (...args: any[]) => any>,
  K extends keyof M = "default"
>(
  lazyLoad: () => Promise<M>,
  moduleName: K
) => {
  let expiryInProcess = false
  return async (...args: ArgumentType<M[K]>) => {
    let importedModule: M
    if (moduleCache.has(moduleName)) {
      importedModule = moduleCache.get(moduleName) as M
    } else {
      importedModule = await lazyLoad()
      moduleCache.set(moduleName, importedModule)
      setTimeout(() => moduleCache.delete(moduleName), TTL)
    }
    return importedModule[moduleName](...args) as ReturnType<
      M[K]
    > extends Promise<infer U>
      ? U
      : Promise<any>
  }
}
