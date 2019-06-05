import { Aggregate } from "mongoose"
import { service } from "../service"
import { Eggs } from "./../db/eggs"
import { Dragons, IDragon } from "../db/dragon"
interface MongoAggregate<T> extends Aggregate<T> {
  _pipeline: Record<string, any>[]
}
const createPipeline = <T>(
  createAggregate: (aggregate: Aggregate<T>) => Aggregate<T>
): { pipeline: MongoAggregate<T>["_pipeline"] } => {
  const aggregation = new Aggregate<T>()
  const { _pipeline: pipeline } = createAggregate(
    aggregation
  ) as MongoAggregate<T>
  return { pipeline }
}
interface Identifier {
  id: string
  name: string
}

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

  private static createMatch(
    firstDragonIdentifier: string,
    secondDragonIdentifier: string
  ) {
    const $and = [
      { firstDragonIdentifier },
      {
        secondDragonIdentifier
      }
    ]
    return {
      $and
    }
  }

  public async findChildren(parents: { first: string; second: string }) {
    const { db } = this
    const eggAggregation = db.Eggs.aggregate()
    const match = EggService.createMatch(parents.first, parents.second)
    const lookup = {
      from: "decks",
      let: {
        deck: "possibleRawEggDistribution.type"
      },
      ...createPipeline<unknown>(agg =>
        agg
          .match({
            $expr: {
              $eq: ["$identifer", "$$deck"]
            }
          })
          .unwind("$possibleOutcomeDistribution")
          .lookup({
            from: "dragons",
            let: {
              pair: "$possibleOutcomeDistribution.id"
            },
            ...createPipeline(drag =>
              drag.match({
                $expr: {
                  $eq: ["$identifier", "$$pair"]
                }
              })
            ),
            as: "name"
          })
          .unwind("name")
          .replaceRoot({
            _id: "$_id",
            identifier: "$identifier",
            possibleOutcomeDistribution: {
              _id: "$possibleOutcomeDistribution.id",
              name: "$name.displayName",
              distribution: "$possibleOutcomeDistribution.distribution",
              probability: "$possibleOutcomeDistribution.probability"
            }
          })
          .group({
            _id: "$_id",
            breeding: {
              $push: "$possibleOutcomeDistribution"
            }
          })
      ),
      as: "breedDeck"
    }
    try {
      const results = await eggAggregation
        .match(match)
        .lookup(lookup)
        .unwind("$breedDeck")
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
    const [{ id }] = parentList
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
