import { Aggregate } from "mongoose"
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

@service(() => ({
  Eggs,
  Dragons
}))
export class EggService {
  private db!: {
    Eggs: typeof Eggs
  }

  private static createMatch({
    first: firstDragonIdentifier,
    second: secondDragonIdentifier,
    eggs
  }: {
    first: string
    second: string
    eggs: Aggregate<any[]>
  }) {
    const $and = [
      { firstDragonIdentifier },
      {
        secondDragonIdentifier
      }
    ]
    return eggs.match({
      $and
    })
  }

  public async findChildren(parents: { first: string; second: string }) {
    const [{ pipeline }, { db }] = [await import("./pipeline"), this]
    const match = EggService.createMatch({
      ...parents,
      ...this.db,
      eggs: db.Eggs.aggregate()
    })

    try {
      const results = await match
        .lookup(pipeline.$lookup)
        .unwind(pipeline.$unwind)
        .replaceRoot(pipeline.$replaceRoot.newRoot)
        .exec()
      return results
    } catch (e) {
      return {
        status: "REJECTED",
        reason: e.message
      }
    }
  }

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
