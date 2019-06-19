/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findDragon
// ====================================================

export interface findDragon_dragon_levels_cost {
  __typename: "Cost";
  type: string | null;
  amount: number | null;
}

export interface findDragon_dragon_levels {
  __typename: "Level";
  _id: string;
  level: number;
  attack: number | null;
  health: number | null;
  reqLevel: number | null;
  xp: number | null;
  cost: (findDragon_dragon_levels_cost | null)[] | null;
}

export interface findDragon_dragon {
  __typename: "Dragon";
  _id: string;
  name: string | null;
  description: string | null;
  levels: (findDragon_dragon_levels | null)[] | null;
  frags: number | null;
  incubatorLevel: number | null;
  incubatingTime: number | null;
}

export interface findDragon {
  dragon: findDragon_dragon | null;
}

export interface findDragonVariables {
  id: string;
}
