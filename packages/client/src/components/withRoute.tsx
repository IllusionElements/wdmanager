import React from "react"
import { Route } from "react-router-dom"
type RouteChildProps = ReactPropsType<typeof Route>
class Cache<T> extends Map<keyof T, T[keyof T]> {
  constructor(o?: T) {
    if (!o) {
      super()
    } else {
      super(Object.entries(o) as [keyof T, T[keyof T]][])
    }
  }

  public get<K extends keyof T>(k: K): T[K] | undefined {
    return super.get(k) as T[K]
  }

  public set<K extends keyof T>(k: K, v: T[typeof k]) {
    return super.set(k, v)
  }
}
type Unpack<T> = T extends (infer R)[] ? R : T
const CACHED: unique symbol = Symbol("@@cached_value")
const PREV_ARGS: unique symbol = Symbol("@@prev_args")
const memo = <T extends Functor<any, any>, A extends ArgumentType<T>>(
  f: T,
  validator?: (
    prevArgs: Unpack<ArgumentType<T> | A>[],
    nextArgs: Unpack<ArgumentType<T> | A>[]
  ) => boolean
) => {
  const cached = new Cache<{
    [PREV_ARGS]: Unpack<ArgumentType<T> | A>[]
    [CACHED]: ReturnType<T>
  }>()

  return (...nextArgs: Unpack<ArgumentType<T> | A>[]) => {
    let useCachedReturn: boolean = false
    const prevArgs = cached.get(PREV_ARGS)

    if (prevArgs) {
      useCachedReturn = validator
        ? validator(prevArgs, nextArgs)
        : prevArgs.toString() !== nextArgs.toString()
    }

    if (useCachedReturn) {
      const returnValue = cached.get(CACHED)!
      return returnValue
    }

    const valueToCache: ReturnType<T> = f(...nextArgs)

    cached.set(PREV_ARGS, nextArgs).set(CACHED, valueToCache)
    return valueToCache
  }
}
const renderRoute = memo<
  <T extends RouteChildProps>(
    ...args: [React.ComponentType<T>]
  ) => React.ComponentType<T>,
  [React.ComponentType<any>]
>(
  <T extends RouteChildProps>(Component: React.ComponentType<T>) => (
    props: T
  ) => <Component {...props} />,
  ([prevComponent], [nextComponent]) => prevComponent !== nextComponent
)

export default <Props extends RouteChildProps>(
  Component: React.ComponentType<Props>
) => (props: Props) => <Route {...props}>{renderRoute(Component)}</Route>
