function map<R>(transform: <T>(...args: [T, number, T[]]) => R) {
  let i = 0
  let _arr: unknown[] | null
  return function _internalMap<T>(arr: T[]): R[] {
    if (_arr === null) {
      _arr = arr
    }
    const [head, ...tail] = arr
    if (!head && tail.length === 0) {
      i = 0
      return []
    }

    return [transform<T>(head, i++, <T[]>_arr), ..._internalMap(tail)]
  }
}
const check = {
  isNull: (val: unknown): val is null => val === null,
  isUndefined: (v: unknown): v is undefined => v === undefined
}
const isNotDefined = (v: unknown): boolean =>
  check.isNull(v) || check.isUndefined(v)
const and = <T>(a: T) => <U>(b: U) => a && b
const filter = <S>(
  predicate: <T>(value: unknown, i: number, arr: T[]) => value is S
) => {
  let i = 0

  const filterTransform = <T>(arr: T[]): T[] => {
    const [head, ...tail] = arr
    const isZero = and(isNotDefined(head))
    const isTailLengthZeroAndIsHeadNotDefined = isZero(tail.length === 0)
    const headPassesPredicateCheck = predicate(head, i++, arr)
    return isTailLengthZeroAndIsHeadNotDefined
      ? []
      : headPassesPredicateCheck
      ? [head, ...filterTransform(tail)]
      : [...filterTransform(tail)]
  }

  return filterTransform
}
