import Dataloader from 'dataloader'
const dragonDataLoader = new Dataloader((keys) => {
  const {Dragons} = await import("@manager/services")
  if(keys.length > 1) {
    return Dragons.where("identifier").in(keys).exec()
  }

  return Dragons.findOne({
    identifier: keys[0]
  }).exec()
})
class LoaderError extends Error {
  constructor(msg, results) {
    super(`WARN - ${msg}`)
    console.log(results)
    Error.captureStackTrace(LoaderError)
  }
}
let isLoaderWorking = true
export const dragon = async (_, { name: identifier}, { dragons: { db } }) => {
  if(isLoaderWorking) {
    try {
      const results = await dragonDataLoader.load(identifier)
      if(!results || results === undefined) throw new LoaderError('dataloader implementation broken')
      return results
    } catch(e) {
      isLoaderWorking = false
      console.error(e)
    }
  }
  console.error('DATALOADER IMPLEMENTATION BROKEN PLEASE CHECK')
  const drag = await db.findOne({ identifier: drag }).exec()

  return drag
}
