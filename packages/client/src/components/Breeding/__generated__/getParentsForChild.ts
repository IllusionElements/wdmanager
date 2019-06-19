/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Child } from "../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getParentsForChild
// ====================================================

export interface getParentsForChild_dragonParents_dragon {
  __typename: "Dragon";
  _id: string;
  name: string | null;
  identifier: string;
  isAttainable: boolean | null;
}

export type getParentsForChild_dragonParents_parents = any;

export interface getParentsForChild_dragonParents {
  __typename: "DragonParents";
  _id: string;
  breedChance: number;
  dragon: getParentsForChild_dragonParents_dragon;
  parents: getParentsForChild_dragonParents_parents;
}

export interface getParentsForChild {
  dragonParents: getParentsForChild_dragonParents[];
}

export interface getParentsForChildVariables {
  child: Child;
}
