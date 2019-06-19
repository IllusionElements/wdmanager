/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Rarity {
  COMMON = "COMMON",
  EPIC = "EPIC",
  LEGENDARY = "LEGENDARY",
  MYTHIC = "MYTHIC",
  RARE = "RARE",
}

export interface Child {
  id: string;
}

export interface FilterParams {
  breed?: boolean | null;
  divine?: boolean | null;
}

export interface Parent {
  first: string;
  second: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
