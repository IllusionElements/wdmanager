const isNull = (n: unknown): n is null => n === null
type $Value<T, K extends keyof T = keyof T> = T[K]
type $Entries<T extends object> = [keyof T, $Value<T>][]
type $Keys<T> = keyof T

type $ClassType<T> = T extends new (...args: any[]) => infer R ? R : T
const $super = <T extends new (...args: any[]) => any, C extends $ClassType<T>>(
  o: T,
  ctx: C
) => {
  return new Proxy(o.prototype, {
    get: (t, k) => (Reflect.has(t, k) ? Reflect.get(t, k).bind(ctx) : undefined)
  }) as C
}
const isPlainObject = (o: unknown): o is object =>
  typeof o === "object" && !isNull(o) && o.toString() === "[object Object]"
export default class KeyedMap<
  T extends Record<string | number | symbol, any>
> extends Map<keyof T, $Value<T>> {
  //@ts-ignore
  static of<K, V>(target?: Record<K, V> | [K, V][]) {
    //@ts-ignore
    return new KeyedMap<Record<K, V>>(target)
  }
  constructor(target?: T | $Entries<T>) {
    // const isTarget
    if (target === undefined) super()
    else {
      const isTargetPlainObject = isPlainObject(target)
      super(
        isTargetPlainObject
          ? <$Entries<T>>Object.entries(target)
          : <$Entries<T>>target
      )
      Array.from([])
    }
  }

  public get<K extends $Keys<T>>(k: K): T[K] | undefined {
    return super.get(k as K)
  }

  public set<K extends $Keys<T>>(key: K, value: T[K]): this {
    if (this.has(key) && super.get(key) !== value) {
      const map = new KeyedMap<T>([...this.entries()])
      $super(Map, map).set(key, value)
      return map as this
    }
    return super.set(key, value)
  }

  public map<M>(
    mapper: (val: $Value<T>, key: $Keys<T>, col: this) => M
  ): KeyedMap<Record<$Keys<T>, M>> {
    const map = new KeyedMap<Record<$Keys<T>, M>>()
    for (const [key, value] of this) {
      const mapped = mapper(value, key, this)
      map.set(key, mapped)
    }
    // map.de

    return map
  }

  public mapKeys<M extends string | symbol | number>(
    mapper: (key: $Keys<T>, val: $Value<T>, col: this) => M
  ): KeyedMap<Record<M, $Value<T>>> {
    const map = new KeyedMap<Record<M, $Value<T>>>()
    for (const [key, value] of this) {
      const mappedKey = mapper(key, value, this)
      map.set(mappedKey, value)
    }
    return map
  }

  public filter<F extends $Value<T>>(
    predicate: (value: $Value<T>, key: $Keys<T>, iter: this) => value is F,
    context?: unknown
  ): KeyedMap<Record<$Keys<T>, F>> {
    const map = KeyedMap.of<$Keys<T>, F>()
    for (const [key, val] of this) {
      if (predicate.call(context, val, key, this)) map.set(key, val)
    }

    return map
  }
  public flip() {
    const map = new KeyedMap<Record<$Value<T>, $Keys<T>>>()

    for (const [k, v] of this) {
      map.set(v, k)
    }
    return map
  }

  public toJSON() {
    return [...this].reduce(
      (prev, [key, val]) => ({
        ...prev,
        [key]: val
      }),
      {}
    ) as T
  }
}
