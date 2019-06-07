export const allSettled = async <T extends Promise<any> | Promise<any>[]>(
  promises: T extends infer R
    ? R extends Promise<any>[]
      ? R
      : R[]
    : Promise<T>[]
) => {
  const promiseList = []
  for (const prom of promises) {
    try {
      const result = await prom
      promiseList.push(<
        AllSettled<Keys.SUCCESS, T extends Promise<infer U>[] ? U : any>
      >{
        status: PromiseStatus.RESOLVED,
        result
      })
    } catch (e) {
      promiseList.push({
        status: PromiseStatus.REJECTED,
        reason: e.message
      } as AllSettled<Keys.FAIL>)
    }
  }

  return promiseList
}
declare global {
  interface PromiseConstructor {
    allSettled: typeof allSettled
  }
}
Promise.allSettled = allSettled
