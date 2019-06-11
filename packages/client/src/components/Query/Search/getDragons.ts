import gql from "graphql-tag.macro"
export const GET_DRAGONS = gql`
  query getDragon {
    dragons {
      _id
      identifier
      name: displayName
    }
  }
`
