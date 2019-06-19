/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { FilterParams } from "../../../../__generated__/globalTypes"

// ====================================================
// GraphQL query operation: child
// ====================================================

export type child_dragon_children_parents = any

export interface child_dragon_children_eggCombos_dragon {
  __typename: "Dragon"
  _id: string
  name: string | null
  identifier: string
  isAttainable: boolean | null
}

export interface child_dragon_children_eggCombos {
  __typename: "Deck"
  _id: string
  dragon: child_dragon_children_eggCombos_dragon
  fragments: number
  probability: number
}

export interface child_dragon_children {
  __typename: "Breeding"
  _id: string
  parents: child_dragon_children_parents
  eggCombos: child_dragon_children_eggCombos[]
}

export interface child_dragon {
  __typename: "Dragon"
  _id: string
  name: string | null
  identifier: string
  isAttainable: boolean | null
  children: (child_dragon_children | null)[] | null
}

export interface child {
  dragon: child_dragon | null
}

export interface childVariables {
  dragon: string
  filters: FilterParams
}
