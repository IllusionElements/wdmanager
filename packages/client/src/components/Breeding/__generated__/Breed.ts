/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Breed
// ====================================================

export interface Breed_dragon {
  __typename: "Dragon";
  _id: string;
  name: string | null;
  identifier: string;
  isAttainable: boolean | null;
}

export interface Breed {
  __typename: "Deck";
  _id: string;
  dragon: Breed_dragon;
  fragments: number;
  probability: number;
}
