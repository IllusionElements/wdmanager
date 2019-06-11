const READONLY = Symbol("@@READ_ONLY")
const MetaMap = new Map()
const metadata = new WeakMap()
function READ_ONLY<T extends object>(target: T, propertyKey: keyof T) {
  const value = Reflect.get(target, propertyKey)
  Reflect.defineProperty(target, propertyKey, {
    value,
    writable: false,
    enumerable: true,
    configurable: true
  })
}
const validateObjectState = (o: any) => {
  if (!Object.isFrozen(o) || Object.isExtensible(o) || !Object.isSealed(o)) {
    Object.freeze(o)
  }
}
function FREEZE<T extends new (...args: any[]) => any>(
  target: (T extends new (...args: any[]) => infer R ? R : T) | T,
  opts: { freezeAll: boolean } = {
    freezeAll: false
  }
) {
  if (opts.freezeAll && "prototype" in target) {
    const targets = [target.prototype, target].filter(Object.isFrozen)
    targets.forEach(Object.freeze)
  } else {
    Object.freeze(target)
  }
}
const DECORATE = <T, D extends (t: T, ...args: any[]) => any>(
  decorator: D,
  target: T,
  args?: Omit<ArgumentType<D>, 0>
) => {
  decorator(target, (args && args) || undefined)
  return target
}
export abstract class Actions<Action extends string, T> {
  public abstract readonly type: Action
  constructor(public payload: T) {
    READ_ONLY(this, "type")
    FREEZE(this)
  }
}
