export const combine = <T extends React.Reducer<any, any>[]>(
  ...reducers: T
) => (
  prevState: React.ReducerState<Unpack<T>>,
  action: React.ReducerAction<Unpack<T>>
) => reducers.reduce((state, reducer) => reducer(state, action), prevState)

export function pick<T extends object, K extends keyof T>(t: T, ...keys: K[]) {
  switch (keys.length) {
    case 0:
      return {}
    case 1:
      const [key] = keys
      return Object.defineProperty({}, key, {
        ...Reflect.getOwnPropertyDescriptor(t, key),
        value: Reflect.get(t, key)
      })
    default:
      return keys.reduce(
        (target, key) => ({
          ...target,
          [key]: t[key]
        }),
        {}
      ) as Pick<T, K>
  }
}

function pick2<T extends object, K extends keyof T>(t: T, ...keys: K[]) {
  return new Proxy<T>(t, {
    get: (target, key: K) => {
      if (keys.includes(key)) {
        return Reflect.get(target, key)
      }
      return undefined
    } 
  }) as Pick<T, K>
}


function omit<T extends object, K extends keyof T>(t: T, keys: K[]) {
  return new Proxy(t, {
    get: (tar, key: K) => {
      if (!keys.includes(key)) Reflect.get(tar, key)
      return undefined
    }
  }) as Omit<T, K>
}