export type Optional<T, K = unknown> = K extends keyof T
  ? { [Key in keyof Pick<T, K>]?: T[Key] } & T
  : { [Key in keyof T]?: T[Key] }
