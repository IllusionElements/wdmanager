import { Tier } from "./query"
import { createAction } from "../../../createAction"
export enum TierActionEnum {
  SET_CURRENT_TIER = "SET_CURRENT_TIER",
  SET_TIERS = "SET_TIERS"
}

export type SetTiersAction = IAction<TierActionEnum.SET_TIERS, Tier[]>
export type SetCurrentTierAction = IAction<
  TierActionEnum.SET_CURRENT_TIER,
  Tier["tier"]
>
export type TierActions = SetCurrentTierAction | SetTiersAction
export interface TierState {
  currentTier: number
  tiers: Tier[]
}

export const setCurrentTier = createAction<SetCurrentTierAction>(
  TierActionEnum.SET_CURRENT_TIER
)
export const setTiers = createAction<SetTiersAction>(TierActionEnum.SET_TIERS)
