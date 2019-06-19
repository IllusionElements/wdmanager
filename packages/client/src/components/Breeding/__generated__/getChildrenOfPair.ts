/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Parent } from "../../../../__generated__/globalTypes"

// ====================================================
// GraphQL query operation: getChildrenOfPair
// ====================================================

export type getChildrenOfPair_dragonChildren_parents = any

export interface getChildrenOfPair_dragonChildren_children_dragon {
  __typename: "Dragon"
  _id: string
  name: string | null
  identifier: string
  isAttainable: boolean | null
}

export interface getChildrenOfPair_dragonChildren_children {
  __typename: "Deck"
  _id: string
  dragon: getChildrenOfPair_dragonChildren_children_dragon
  fragments: number
  probability: number
}

export interface getChildrenOfPair_dragonChildren {
  __typename: "Breeding"
  _id: string
  deck: string
  parents: getChildrenOfPair_dragonChildren_parents
  children: getChildrenOfPair_dragonChildren_children[]
}

export interface getChildrenOfPair {
  dragonChildren: getChildrenOfPair_dragonChildren[]
}

export interface getChildrenOfPairVariables {
  parents: Parent
}
