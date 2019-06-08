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
    const pipeline = [
      {
        $match: {
          $expr: {
            $eq: ["$possibleRawEggDistribution.type", "$$id"]
          }
        }
      },
      {
        $lookup: {
          from: "dragons",
          localField: "firstDragonIdentifier",
          foreignField: "identifier",
          as: "firstParent"
        }
      },
      {
        $lookup: {
          from: "dragons",
          localField: "secondDragonIdentifier",
          foreignField: "identifier",
          as: "secondParent"
        }
      },
      {
        $unwind: "$firstParent"
      },
      {
        $unwind: "$secondParent"
      },
      {
        $project: {
          _id: "$_id",
          firstDragonIdentifier: {
            id: "$firstDragonIdentifier",
            name: "$firstParent.displayName"
          },
          secondDragonIdentifier: {
            id: "$secondDragonIdentifier",
            name: "$secondParent.displayName"
          }
        }
      }
    ]
    const deck = db.Eggs.aggregate()
      .unwind("possibleOutcomeDistribution")
      .match({ "$possibleOutcomeDistribution.id": opts.child })
      .project({
        identifier: "$identifier",
        id: "$possibleOutcomeDistribution.id"
      })
      .lookup({
        from: "eggs",
        let: {
          id: "$identifier"
        },
        as: "parents",
        pipeline
      })
      .unwind("parents")

    const parentList = (await deck.exec()) as Result[]
    const [{ id }] = parentList as ({ id: string })[]
    const [{ displayName: dragonName }] = ((await Dragons.find({
      identifier: id
    }).exec()) as unknown) as IDragon[]
    return {
      dragonName,
      id,
      parents: parentList.reduce((arr, parent) => [...arr, parent], <
        Result[]
      >[])
    }
  }
}
