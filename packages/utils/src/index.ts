declare global {
  // import Entry from './../../client/src/components/Vault';
  type Functor<Returns, A extends unknown[] = any[]> = (...args: A) => Returns
  type AnyFunctor = Functor<any>
  type AnyReturnFunctor<A extends unknown[] = any[]> = Functor<any, A>
  type ArgumentType<F extends AnyFunctor> = F extends AnyReturnFunctor<infer R>
    ? R
    : any[]
  const enum PromiseStatus {
    RESOLVED = "RESOLVED",
    REJECTED = "REJECTED"
  }
  type Union<A, B> = A | B
  namespace Keys {
    export type SUCCESS = "SUCCESS"
    export type FAIL = "FAIL"
  }
  type Optional<T extends object | any[], Deep = false> = Deep extends true
    ? { [K in keyof T]?: T[K] extends object | any[] ? Optional<T[K]> : T[K] }
    : { [K in keyof T]?: T[K] }
  type SettledKeys = Union<Keys.SUCCESS, Keys.FAIL>
  type AllSettled<Key extends SettledKeys, R = null> = Key extends Keys.SUCCESS
    ? {
        result: R
        status: PromiseStatus.RESOLVED
      }
    : Key extends Keys.FAIL
    ? {
        reason: string
        status: PromiseStatus.REJECTED
      }
    : never
  type ArrayParamType<T> = T extends (infer R)[] ? R : T
}
// type $Readon
type Nullable<T> = T | undefined
type AnyRecord = Record<any, any>
type Entry<T> = T extends Record<infer Keys, infer Values>
  ? readonly Readonly<[Keys, Values]>[]
  : T extends {
      // @ts-ignore
      [key: infer Key]: infer Value
    }
  ? Readonly<[Key, Value]>[]
  : T extends (infer R)
  ? Readonly<[number, R]>[]
  : never
const isEntry = <T>(u: unknown): u is Entry<T> =>
  Array.isArray(u) && u.every(n => Array.isArray(n) && n.length === 2)

type $Value<T, K extends keyof T = keyof T> = T[K]

export class KVMap<T extends AnyRecord = AnyRecord> extends Map<
  keyof T,
  $Value<T>
> {
  constructor(target?: T | Entry<T>) {
    if (undefined === target) {
      super()
    } else if (isEntry<T>(target)) {
      super(target)
    } else {
      super(Object.entries(target))
    }
  }

  get<Key extends keyof T>(key: Key): Nullable<$Value<T, Key>> {
    return super.get(key)
  }

  set<Key extends keyof T>(key: Key, value: $Value<T, Key>): this {
    return super.set(key, value)
  }
}

export { lazy } from "./lazy"
export { pick } from "./pick"

export const loadAllSettledPolyfill = () => require("./allSettled")
export const isNotEmpty = (arr: any[]) => arr.length > 0 || arr[0] !== undefined
