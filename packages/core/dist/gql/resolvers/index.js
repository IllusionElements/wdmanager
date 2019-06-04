import { MongoClient } from "mongodb"
const findDragonLevels = async (db, identifier) => {
  const collection = db.collection("levels")
  return collection.find({
    identifier: {
      $eq: identifier
    }
  })
}
const levelLookup = {
  from: "levels",
  localField: "identifier",
  foreignField: "identifier",
  as: "levels"
}
const cdn = ""
const pick = (k, transform) => (o, ...args) => {
  if (transform) {
    return transform(o[k], ...args)
  }
  //@ts-ignore
  return o[k]
}
// Tier Resolver
export const Dragon = {
  rarity: pick("defaultRarity", (rarity, _, { dragons: { service } }) =>
    service.rarity.get(rarity)
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
  defaultIconFilename: ({ defaultIconFilename }) =>
    `${cdn}${defaultIconFilename}`,
  levels: async ({ identifier, ...dragons }) => {
    if (dragons.levels) {
      return dragons.levels
    }
    const client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true
    })
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
  },
  element: ({ elementIdentifier }) => elementIdentifier.slice(0, -7)
}
export const TierType = {
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
export const breeding = {}
export const Query = {
  tiers: (_root, _, context) => context.tiers.service.getAllTiers(),
  dragons: async (_root, _, context) => {
    const {
      dragons: { db }
    } = context
    const aggregate = db.aggregate()
    const dragonsLookup = aggregate.lookup(levelLookup)
    const data = await dragonsLookup.exec()
    if (
      data.rarity &&
      ![...context.dragons.service.rarity.values()].some(
        rarity => rarity === data.rarity
      )
    ) {
      return {
        ...data,
        rarity: context.dragons.service.rarity.get(data.rarity)
      }
    }
    return data
  }
  //TO-DO: ADD DRAGON, TIER, & BREEDING RESOLVERS
}
