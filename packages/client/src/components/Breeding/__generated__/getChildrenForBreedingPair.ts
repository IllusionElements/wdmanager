/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Parent } from "../../../../__generated__/globalTypes"

// ====================================================
// GraphQL query operation: getChildrenForBreedingPair
// ====================================================

export type getChildrenForBreedingPair_dragonChildren_parents = any

export interface getChildrenForBreedingPair_dragonChildren_children_dragon {
  __typename: "Dragon"
  _id: string
  name: string | null
  identifier: string
}

export interface getChildrenForBreedingPair_dragonChildren_children {
  __typename: "Deck"
  dragon: getChildrenForBreedingPair_dragonChildren_children_dragon
  probability: number
  fragments: number
}

export interface getChildrenForBreedingPair_dragonChildren {
  __typename: "Breeding"
  _id: string
  parents: getChildrenForBreedingPair_dragonChildren_parents
  children: getChildrenForBreedingPair_dragonChildren_children[]
}

export interface getChildrenForBreedingPair {
  dragonChildren: getChildrenForBreedingPair_dragonChildren[]
}

export interface getChildrenForBreedingPairVariables {
  parents: Parent
}
