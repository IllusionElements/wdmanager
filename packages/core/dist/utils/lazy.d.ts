export declare const lazy: <M extends Record<string, (...args: any[]) => any>, K extends keyof M = "default">(lazyLoad: () => Promise<M>, moduleName: K) => (...args: ArgumentType<M[K]>) => Promise<ReturnType<M[K]> extends Promise<infer U> ? U : Promise<any>>;