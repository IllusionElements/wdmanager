/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Rarity } from "../../../../__generated__/globalTypes"

// ====================================================
// GraphQL query operation: getTier
// ====================================================

export interface getTier_tier_dragons {
  __typename: "Dragon"
  _id: string
  name: string | null
  element: string | null
  identifier: string
  isDivine: boolean | null
  rarity: Rarity | null
  isAttainable: boolean | null
}

export interface getTier_tier {
  __typename: "Tier"
  _id: string | null
  dragons: (getTier_tier_dragons | null)[] | null
}

export interface getTier {
  tier: (getTier_tier | null)[] | null
}

export interface getTierVariables {
  tier: string
}
