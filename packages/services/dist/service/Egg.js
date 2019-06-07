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
import mongoose from "mongoose"
import { service } from "../service"
import { Eggs } from "./../db/eggs"
import { Dragons } from "../db/dragon"
const { Aggregate } = mongoose
const createPipeline = createAggregate => {
  const aggregation = new Aggregate()
  const { _pipeline: pipeline } = createAggregate(aggregation)
  return { pipeline }
}
let EggService = (EggService_1 = class EggService {
  static createMatch(firstDragonIdentifier, secondDragonIdentifier) {
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
  async findChildren(parents) {
    const { db } = this
    const eggAggregation = db.Eggs.aggregate()
    const match = EggService_1.createMatch(parents.first, parents.second)
    const lookup = {
      from: "decks",
      let: {
        deck: "possibleRawEggDistribution.type"
      },
      ...createPipeline(agg =>
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
  async findParents(opts) {
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
    const parentList = await deck.exec()
    const [{ id }] = parentList
    const [{ displayName: dragonName }] = await Dragons.find({
      identifier: id
    }).exec()
    return {
      dragonName,
      id,
      parents: parentList.reduce((arr, parent) => [...arr, parent], [])
    }
  }
})
EggService = EggService_1 = __decorate(
  [
    service(() => ({
      Eggs,
      Dragons
    }))
  ],
  EggService
)
export { EggService }
