if (!Reflect.has(globalThis, "setImmediate") && globalThis.window) {
  //@ts-ignore
  globalThis.setImmediate = (f: (...args: any[]) => void) =>
    globalThis.setTimeout(f, 0)
}
const sleep = (t: number) =>
  new Promise(resolve => {
    if (t > 0) {
      globalThis.setTimeout(resolve, t)
    } else {
      const run = globalThis.process.nextTick || globalThis.setImmediate
      run(resolve)
    }
  })
type Unpack<T> = T extends (infer R)[] ? R : T
class Future<T> extends Promise<T> {
  // static map
  static delay<T = unknown>(ms: number, value?: Future<T>): Future<T> {
    if (!value) {
      return Future.resolve(sleep(ms)) as Future<T>
    }

    const res = new Future(resolve => resolve(value))
    return res.then(
      async v => {
        await sleep(ms)
        return Promise.resolve(v)
      },
      e => {
        throw e
      }
    ) as Future<T>
  }

  public delay(ms: number): Future<T> {
    return Future.delay(ms, this as Future<T>)
  }

  public mapSeries<R>(
    mapper: (arg: Unpack<T> | T, i: number) => R | Future<R>
  ) {
    return new Future(async resolve => {
      const res = await this
      const data = []
      if (Array.isArray(res)) {
        let i = 0
        for (const el of res) {
          let valToMap
          if (el instanceof Promise || el instanceof Future) {
            valToMap = mapper(await el, i++)
          } else {
            valToMap = mapper(el, i++)
          }

          if (valToMap instanceof Promise || valToMap instanceof Future) {
            const result = await valToMap
            data.push(result)
          } else data.push(val)
        }

        resolve(Promise.all(data))
      } else {
        const result = mapper(res, 0)
        resolve(result)
      }
    })
  }
}
