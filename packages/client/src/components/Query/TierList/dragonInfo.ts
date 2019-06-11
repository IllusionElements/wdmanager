import gql from "graphql-tag.macro"

export default gql`
  query tierList {
    tiers {
      _id
      tier
      name
      dragons {
        _id
        name: displayName
        element
        identifier
        isDivine
        rarity
        isAttainable
      }
    }
  }
`
