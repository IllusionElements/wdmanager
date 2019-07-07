var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc)
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
    return c > 3 && r && Object.defineProperty(target, key, r), r
  }
var EggService_1
import { service } from "../service"
import { Eggs } from "./../db/eggs"
import { Dragons } from "../db/dragon"
import { Breeds } from "../db/Breeds"
const LOG = (ns, { console: csl }) => {
  console.group(ns)
  console.log(
    require("util").inspect(csl(), {
      depth: 20
    })
  )
  console.groupEnd(ns)
}
let EggService = (EggService_1 = class EggService {
  async findChildren(parents) {
    const query = { ...parents, db: this.db }
    const result = await EggService_1.find(query)
    console.log({ result, query })
    return result
  }
  async findParents(opts) {
    const { db } = this
    const { default: pipeline } = await import("./breedPipeline")
    const breeds = db.Breeds.aggregate()
    console.log(
      JSON.stringify(opts.child, null, 2),
      Object.keys(opts),
      Object.keys
    )
    const parentAggregation = breeds
      .match(pipeline.match(opts.child))
      .lookup(pipeline.$lookup)
      .unwind(pipeline.$unwind)
    try {
      const results = await parentAggregation.exec()
      return results
    } catch (e) {
      console.log(e)
      throw new Error("an error has occured")
    }
  }
})
// private static createMatch({
//   first: firstDragonIdentifier,
//   second: secondDragonIdentifier,
//   eggs
// }: DragonIdentifier & {
//   eggs: Aggregate<any[]>
// }) {
//   const $and = [
//     { firstDragonIdentifier },
//     {
//       secondDragonIdentifier
//     }
//   ]
//   return eggs.match({
//     $and
//   })
// }
EggService.find = async ({
  first: firstDragonIdentifier,
  second: secondDragonIdentifier,
  db: { Eggs: db }
}) => {
  const data = await db
    .find({
      firstDragonIdentifier,
      secondDragonIdentifier
    })
    .exec()
  LOG(`EggService.find`, { console: () => ({ results: data }) })

  return data
}

EggService = EggService_1 = __decorate(
  [
    service(() => ({
      Eggs,
      Dragons,
      Breeds
    }))
  ],
  EggService
)

export { EggService }
