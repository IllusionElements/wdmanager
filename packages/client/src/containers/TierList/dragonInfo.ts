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
  ${DRAGON_FRAGMENT}
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
export const TIERS_QUERY = gql`
  query findAllTiers {
    tiers {
      _id
      tier
      name
    }
  }
`

export const TIER_QUERY = gql`
  query getTier($tier: String!) {
    tier(key: $tier) {
      _id
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
