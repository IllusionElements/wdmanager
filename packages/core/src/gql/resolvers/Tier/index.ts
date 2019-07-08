import { Tier } from "@manager/services"
import { pick } from "@manager/utils"
import { ResolverContext } from "../ResolverContext"
const TierType: Record<
  string,
  (tier: Tier, _: {}, context: ResolverContext) => unknown
> = {
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

export const name: (
  tier: Tier,
  _: {},
  context: ResolverContext
) => string = pick("tierName")

export const { dragons } = TierType
