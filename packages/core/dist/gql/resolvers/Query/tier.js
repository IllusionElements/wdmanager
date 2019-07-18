import produce from "immer"
import { dragons, name } from "../Tier"
export class Tier {
  constructor(root) {
    console.log({ root })
    this.tierName = root.tierName
    this.tier = root.tier
    this._id = root._id
  }

  async dragons(...args) {
    return dragons(...args)
  }

  async dragon(_, { name: identifier }, ctx) {
    const dragon = await ctx.dragons.db
      .findOne({
        identifier,
        defaultTierNumber: this.tier
      })
      .exec()

    return dragon
  }
}
export const tier = async (_, { id }, ctx) => {
  let data = await ctx.tierIDLoader.load(id)
  if (!data || data === undefined) {
    const cursor = ctx.tiers.db.findOne({
      _id: id
    })

    data = await cursor.exec()
  }
  const tier = new Tier(data)

  return tier
}
