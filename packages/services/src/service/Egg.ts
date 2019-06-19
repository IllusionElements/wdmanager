import { Model } from "mongoose"
import { service } from "../service"
import { Eggs } from "./../db/eggs"
import { Dragons, IDragon } from "../db/dragon"

interface Identifier {
  id: string
  name: string
}
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

export interface Result extends Omit<Identifier, "name"> {
  _id: string
  identifier: string
  parents: {
    _id: string
    firstDragonIdentifier: Identifier
    secondDragonIdentifier: Identifier
  }
}
interface DragonIdentifier {
  first: string
  second: string
}
@service(() => ({
  Eggs,
  Dragons
}))
export class EggService {
  private db!: {
    Eggs: typeof Eggs
  }

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

  private static find = <T extends Model<any, any>, DB extends { Eggs: T }>({
    first: firstDragonIdentifier,
    second: secondDragonIdentifier,
    db: { Eggs: db }
  }: DragonIdentifier & { db: DB | { Eggs: T } }): ReturnType<
    ReturnType<DB["Eggs"]["find"]>["exec"]
  > =>
    db
      .find({
        firstDragonIdentifier,
        secondDragonIdentifier
      })
      .exec()

  public findChildren = (parents: { first: string; second: string }) =>
    EggService.find({ ...parents, db: this.db })

  public async findParents(opts: { child: string }) {
    const { db } = this
    const { default: pipeline } = await import("./breedPipeline")
    const deck = db.Eggs.aggregate()
    const parentAggregation = deck
      .match(pipeline.match(opts.child))
      .lookup(pipeline.$lookup)
      .unwind(pipeline.$unwind)
    try {
      const results = await parentAggregation.exec()
      console.log({ results })
      return results
    } catch (e) {
      console.log(e)
      throw new Error("an error has occured")
    }
  }
}
