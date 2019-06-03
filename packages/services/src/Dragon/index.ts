import { service } from "../service"
import { Dragons, Tiers, IDragon } from "../db"
enum Rarity {
  COMMON = "common",
  RARE = "rare",
  EPIC = "epic",
  LEGENDARY = "legendary",
  MYTHIC = "mythic"
}
declare type Entry<T, U> = [T, U][]

const Rarities: Entry<number, Rarity> = [
  Rarity.COMMON,
  Rarity.RARE,
  Rarity.EPIC,
  Rarity.LEGENDARY,
  Rarity.MYTHIC
].map((r, i) => [i, r])
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
  Dragons,
  Tiers
}))
//@ts-ignore
class DragonService {
  private db!: {
    Dragons: typeof Dragons
    Tiers: typeof Tiers
  }
  public static rarity: Map<number, Rarity> = new Map(Rarities)
  public rarity: Map<number, Rarity> = DragonService.rarity
  async getAllTiers() {
    const { db } = this
    const dragAggregate = db.Dragons.aggregate()
    const results = await (<Promise<IDragon[]>>dragAggregate
      .lookup(tierLookup)
      .sort(tierSort)
      .exec())
    return results
  }
}

export default DragonService
