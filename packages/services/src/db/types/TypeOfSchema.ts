export type TypeOfSchema<T> = {
  -readonly [K in keyof T]: K extends keyof typeof import("mongoose").Types
    ? T[K]
    : T[K] extends (...args: any[]) => any
    ? ReturnType<T[K]>
    : T[K] extends new (...args: any[]) => infer U
    ? U
    : T[K] extends any[] | object
    ? TypeOfSchema<T[K]>
    : never
}
