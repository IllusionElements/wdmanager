import { pick } from "@manager/utils"
const TierType = {
  dragons: async (tier, _, context) => {
    if (tier.dragons) {
      return tier.dragons
    }
    const { tier: tierID } = tier
    const Dragons = context.dragons.db
    const result = await Dragons.find({
      defaultTier: tierID
    }).exec()
    return result
  }
}
export const name = pick("tierName")
export const { dragons } = TierType
