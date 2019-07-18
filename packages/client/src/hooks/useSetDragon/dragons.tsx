type Keys = "first" | "second"
type DragonResults = {
  [K in Keys]: {
    name: string
    dragons: Dragon[]
  }
}
export const dragons: DragonResults = {
  first: {
    name: "",
    dragons: []
  },
  second: {
    name: "",
    dragons: []
  }
}
type Schema<T> = {
  [K in keyof T]: T[K] extends AnyFunctor ? ReturnType<T[K]> : T[K]
}
interface DragonSchema {
  _id: string
  identifier: String
  inBundle: Number
  displayName: String
  defaultSceneFile: String
  dragonClass: String
  dragonType: String
  defaultRarity: Number
  elementIdentifier: String
  displayDescription: String
  defaultDiscoveredImage: String
  undiscoveredImage: String
  defaultIconFilename: String
  iconFilenameLocked: String
  upgradeCSVFileName: String
  fidgets: String
  minRange: Number
  unlockAchievement: String
  attackStartVal: Number
  sellBasePrice: String
  unavailableSpellTypes: String
  showcaseNodeLocation: String
  isAttainable: Number
  sortPriority: Number
  minDragonLevelForBreeding: Number
  minBreedingCaveBuildingLevelToBreed: Number
  incubationBuildingLevelRequirement: Number
  defaultMaxLevel: Number
  researchMaxLevelIncrease: Number
  eggCurrencyType: String
  eggDisplaySceneFile: String
  defaultAttackBoostRange: String
  defaultHPBoostRange: String
  canSell: Number
  canUpgrade: Number
  canBeSummoned: Number
  deathPenaltyPercentage: Number
  defaultTierNumber: Number
  showInStable: Number
  priorityWithinTier: Number
  numberOfFragmentsNeeded: Number
  isShrineDragon: Number
  isGoldDragon: Number
  limitedTimeOfferDragonActiveEvent: String
  limitedTimeOfferDragonParentsInfoFile: String
  isEvolveDragon: Number
  canPlaceIntoPerch: Number
  isUnbreedableDragon: Number
  buffEndTime: Number
  h: String
}
interface Dragon extends Schema<DragonSchema>, Record<"element", string> {}
export const children: Dragon[] = []
export enum DragonQueryAction {
  SET_FIRST_PARENT = "SET_FIRST_PARENT",
  SET_SECOND_PARENT = "SET_SECOND_PARENT",
  SET_DRAGON_RESULTS = "SET_DRAGON_RESULTS",
  FETCH_FIRST_PARENT_RESULTS = "FETCH_FIRST_PARENT_RESULTS",
  FETCH_SECOND_PARENT_RESULTS = "FETCH_SECOND_PARENT_RESULTS",
  UPDATE_TIER = "UPDATE_TIER"
}
export interface DragonActions
  extends IAction<
    DragonQueryAction.SET_DRAGON_RESULTS,
    {
      dragons: typeof children
    }
  > {}
export interface TierActions
  extends IAction<DragonQueryAction.UPDATE_TIER, NumberRecord<"tier">> {}
type FetchParentKeys =
  | DragonQueryAction.FETCH_FIRST_PARENT_RESULTS
  | DragonQueryAction.FETCH_SECOND_PARENT_RESULTS
type ParentKeys<T> = Exclude<
  DragonQueryAction,
  DragonQueryAction.SET_DRAGON_RESULTS | T | DragonQueryAction.UPDATE_TIER
>
export interface ParentAction<
  K extends ParentKeys<FetchParentKeys> = ParentKeys<FetchParentKeys>
>
  extends IAction<
    K,
    {
      parent: string
    }
  > {}

export interface FetchParentActions<
  K extends FetchParentKeys = FetchParentKeys
> extends IAction<K, Record<"results", Dragon[]>> {}
export type Actions =
  | DragonActions
  | ParentAction<DragonQueryAction.SET_FIRST_PARENT>
  | ParentAction<DragonQueryAction.SET_SECOND_PARENT>
  | FetchParentActions<DragonQueryAction.FETCH_FIRST_PARENT_RESULTS>
  | FetchParentActions<DragonQueryAction.FETCH_SECOND_PARENT_RESULTS>
  | TierActions
export const noop = () => null
