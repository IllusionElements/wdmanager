import { ObjectID } from "mongodb"
import { model, Schema } from "mongoose"
import { TypeOfSchema } from "./types/TypeOfSchema"
import { Level } from "./level"

interface Dragon {
  _id: ObjectID
  levels?: Level[]
}
const dragSchema = <const>{
  identifier: String,
  inBundle: Number,
  displayName: String,
  defaultSceneFile: String,
  dragonClass: String,
  dragonType: String,
  defaultRarity: Number,
  elementIdentifier: String,
  displayDescription: String,
  defaultDiscoveredImage: String,
  undiscoveredImage: String,
  defaultIconFilename: String,
  iconFilenameLocked: String,
  upgradeCSVFileName: String,
  fidgets: String,
  minRange: Number,
  unlockAchievement: String,
  attackStartVal: Number,
  sellBasePrice: String,
  unavailableSpellTypes: String,
  showcaseNodeLocation: String,
  isAttainable: Number,
  sortPriority: Number,
  minDragonLevelForBreeding: Number,
  minBreedingCaveBuildingLevelToBreed: Number,
  incubationBuildingLevelRequirement: Number,
  defaultMaxLevel: Number,
  researchMaxLevelIncrease: Number,
  eggCurrencyType: String,
  eggDisplaySceneFile: String,
  defaultAttackBoostRange: String,
  defaultHPBoostRange: String,
  canSell: Number,
  canUpgrade: Number,
  canBeSummoned: Number,
  deathPenaltyPercentage: Number,
  defaultTierNumber: Number,
  showInStable: Number,
  priorityWithinTier: Number,
  numberOfFragmentsNeeded: Number,
  isShrineDragon: Number,
  isGoldDragon: Number,
  limitedTimeOfferDragonActiveEvent: String,
  limitedTimeOfferDragonParentsInfoFile: String,
  isEvolveDragon: Number,
  canPlaceIntoPerch: Number,
  isUnbreedableDragon: Number,
  buffEndTime: Number,
  h: String
}
export type IDragon = TypeOfSchema<typeof dragSchema> & Dragon

const DragonSchema = new Schema(dragSchema)

export const Dragons = model("dragon", DragonSchema)
