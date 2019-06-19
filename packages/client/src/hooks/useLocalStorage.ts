import { useEffect, useReducer } from "react"
import produce from "immer"
interface Action<Type, T> {
  type: Type
  payload: T
}
const UPDATE_KEY = <const>"UPDATE_KEY"
const UPDATE_VALUE = <const>"UPDATE_VALUE"
type StorageActions<T = null, K = string> =
  | Action<typeof UPDATE_KEY, K>
  | Action<typeof UPDATE_VALUE, T>
interface KVItem<K, V> {
  readonly key: K
  readonly value: V
}

const setItemToCache = <K extends string, T>(key: K, value: T) =>
  localStorage.setItem(key, JSON.stringify(value))
export default <K extends string, V>(initialValue: KVItem<K, V>) => {
  type Item = KVItem<K, V>
  const [item, dispatch] = useReducer(
    (prevItem: Item, actions: StorageActions<V>) => {
      switch (actions.type) {
        case UPDATE_KEY:
          return produce(draft => void (draft.key = actions.payload))(prevItem)
        case UPDATE_VALUE:
          return produce(draft => void (draft.value = actions.payload))(
            prevItem
          )
        default:
          return prevItem
      }
    },
    initialValue
  )
  useEffect(() => {
    const { key, value } = item
    setItemToCache(key, value)
  }, [item.value])

  const updateItem = (value: V) =>
    dispatch({
      type: UPDATE_VALUE,
      payload: value
    })

  const getItem = (key: K) => localStorage.getItem(key)

  return [updateItem, getItem]
}
