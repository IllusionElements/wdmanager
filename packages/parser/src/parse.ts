class Dict<T> extends Map<T[keyof T] | keyof T, string> {
  static from<T>(a: T) {
    return new Dict<T>(a)
  }

  private dict?: T

  private constructor(entry: any[] | T) {
    super()
    this.dict = Array.isArray(entry) ? undefined : entry
  }

  public set(k: keyof T, v: string): this {
    if (this.dict) {
      return super.set(this.dict[k] as T[keyof T], v).set(k, v)
    }

    return super.set(k, v)
  }

  public get(key: keyof T | T[keyof T]) {
    if (this.dict && key in this.dict) {
      return super.get(this.dict[key as keyof T])
    }
    return super.get(key)
  }
}
type Keys<T> = T extends Dict<Record<infer K, any>> ? K[] : any
type Unpack<T> = T extends (infer K)[] ? K : any
const get = <T extends object | any[]>(t: T, k: keyof T) =>
  Reflect.get(t, k) as T extends any[] ? T[number] : T[keyof T]
export default (args: string[]) => {
  const keys = Dict.from(<const>{
    m: "main",
    o: "output",
    e: "extension"
  })!
  const argv = args.slice(2)
  const flags = argv.filter((_, i) => !(i % 2)) as Keys<typeof keys>
  const res = argv.filter((_, i) => i % 2)
  for (const [i, v] of res.entries()) {
    const key = get<string[]>(flags, i).substr(1) as Unpack<typeof flags>
    keys.set(key, v)
  }

  return keys
}
