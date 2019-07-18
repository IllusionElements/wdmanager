import { useCallback } from "react"
import debounce from "lodash.debounce"

export default function useDebounce<T extends AnyFunctor>(
  fn: T,
  t: number = 0
) {
  const debouncedFn = debounce(fn, t)
  const debounced = useCallback(debouncedFn, [debouncedFn])

  return debounced
}
