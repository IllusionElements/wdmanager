/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Rarity } from "../../../../__generated__/globalTypes"

// ====================================================
// GraphQL query operation: tierList
// ====================================================

export interface tierList_tiers_dragons {
  __typename: "Dragon"
  _id: string
  name: string
  element: string
  identifier: string
  isDivine: boolean
  rarity: Rarity
  isAttainable: boolean
}

export interface tierList_tiers {
  __typename: "Tier"
  _id: string
  tier: number
  name: string
  dragons: (tierList_tiers_dragons)[]
}

export interface tierList {
  tiers: (tierList_tiers)[]
}
