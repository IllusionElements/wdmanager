import { Tiers, ITier } from "../db/tier"
import { service } from "../service"
import { IDragon } from "../db/dragon"
type ArrayType<T> = T extends (infer U)[] ? U : any
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
@service(() => ({
  tier: Tiers
}))
export class TierService {
  private db!: {
    tier: typeof Tiers
  }
  async getAllTiers() {
    const dragAggregate = this.db.tier.aggregate()
    const results = await (<Promise<IDragon[]>>dragAggregate
      .lookup(tierLookup)
      .sort(tierSort)
      .exec())

    return results as (ArrayType<typeof results> & ITier)[]
  }
}
