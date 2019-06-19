import gql from "graphql-tag.macro"
export const DRAGON_FRAGMENT = gql`
  fragment Drag on Dragon {
    _id
    name: displayName
    element
    identifier
    isDivine
    rarity
    isAttainable
  }
`
export default gql`
  query tierList {
    tiers {
      _id
      tier
      name
      dragons {
        ...Drag
      }
    }
  }
`

export const TIER_QUERY = gql`
  query getTier($tier: String!) {
    tier(key: $tier) {
      _id
      dragons {
        ...Drag
      }
    }
  }
`
