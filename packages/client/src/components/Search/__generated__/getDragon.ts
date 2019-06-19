/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getDragon
// ====================================================

export interface getDragon_dragons {
  __typename: "Dragon";
  _id: string;
  identifier: string;
  name: string | null;
}

export interface getDragon {
  dragons: (getDragon_dragons | null)[] | null;
}
