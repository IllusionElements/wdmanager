import { Tier } from "./query"

export interface ITierState {
  currentTier: number
  tiers: Tier[]
  loading?: boolean
}

export const TierState: ITierState = {
  currentTier: 0,
  tiers: [],
  loading: true
}
