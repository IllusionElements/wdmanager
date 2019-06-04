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
import produce from "immer"
import { Tiers } from "./db/tier"
import { service } from "./service"
const tierLookup = {
  from: "dragons",
  //    localField: "tier",
  //    foreignField: "defaultTierNumber",
  let: { tier: "$tier" },
  pipeline: [
    {
      $match: {
        $expr: {
          $and: [
            {
              $or: [
                {
                  isAttainable: "1"
                },
                {
                  isShrineDragon: "1"
                }
              ]
            },
            {
              $eq: ["$defaultTierNumber", "$$tier"]
            }
          ]
        }
      }
    }
  ],
  as: "dragons"
}

const tierSort = {
  tier: 1
}

let TierService = class TierService {
  async getAllTiers() {
    const dragAggregate = this.db.tier.aggregate()
    const results = await dragAggregate
      .lookup(tierLookup)
      .sort(tierSort)
      .exec()

    return results.map(({ dragons, ...rest }) => ({
      ...rest,
      dragons: dragons.filter(
        ({ isAttainable, isShrineDragon, canBeSummoned }) => {
          return (isAttainable || isShrineDragon) && canBeSummoned !== "1"
        }
      )
    }))
  }
}
TierService = __decorate(
  [
    service(() => ({
      tier: Tiers
    }))
  ],
  TierService
)
export { TierService }
