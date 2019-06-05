import { IDragon, Level, Tier } from "@manager/services"
import { MongoClient, Db } from "mongodb"
import { ResolverContext } from "../ResolverContext"

const findDragonLevels = async (db: Db, identifier: string) => {
  const collection = db.collection<Level>("levels")
  return collection.find({
    identifier: {
      $eq: identifier
    }
  })
}
const cdn = ""
const pick = <
  T,
  K extends keyof T,
  X extends (o: Pick<T, K>[K], _: any, ctx: ResolverContext) => any = never
>(
  k: K,
  transform?: X
) => (
  o: T,
  ...args: [any, ResolverContext]
): typeof transform extends undefined ? Pick<T, K>[K] : ReturnType<X> => {
  if (transform) {
    return transform(o[k], ...args)
  }
  //@ts-ignore
  return o[k]
}

// Tier Resolver
export const Dragon: Record<
  string,
  (dragon: IDragon, _: any, ctx: ResolverContext) => unknown
> = {
  rarity: pick(
    "defaultRarity",
    (
      rarity: IDragon["defaultRarity"],
      _: any,
      { dragons: { service } }: ResolverContext
    ) => service.rarity.get(rarity)!
  ),
  incubatorLevel: ({ incubationBuildingLevelRequirement }) =>
    incubationBuildingLevelRequirement,
  // levels: (dragon: IDragon) => { },
  breedableLevel: ({ minDragonLevelForBreeding }) => minDragonLevelForBreeding,
  breedingCaveLevel: ({ minBreedingCaveBuildingLevelToBreed }) =>
    minBreedingCaveBuildingLevelToBreed,
  isDivine: pick("isEvolveDragon", Boolean),
  frags: pick("numberOfFragmentsNeeded", Number),
  class: pick("dragonClass"),
  title: pick("dragonType"),
  defaultIconFileName: ({ defaultIconFilename }) =>
    `${cdn}${defaultIconFilename}`,
  levels: async ({ identifier, ...dragons }) => {
    if (dragons.levels) {
      return dragons.levels
    }
    const client = await MongoClient.connect(process.env.MONGO_URL!)
    const db = client.db("war_dragons")
    try {
      const levels = await findDragonLevels(db, identifier)
      return levels.toArray()
    } catch (e) {
      console.error(e)
      return []
    } finally {
      client.close()
    }
  }
}

export const TierType: Record<
  string,
  (tier: Tier, _: {}, context: ResolverContext) => unknown
> = {
  name: pick("tierName"),
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

export { default as Query } from "./Query"
