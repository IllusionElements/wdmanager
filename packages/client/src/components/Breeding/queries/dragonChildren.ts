import gql from "graphql-tag.macro"
export default gql`
  query getChildrenForBreedingPair($parents: Parent!) {
    dragonChildren(parents: $parents) {
      _id
      parents {
        firstParent {
          name: displayName
          identifier
        }
        secondParent {
          name: displayName
          identifier
        }
      }
      children {
        dragon {
          _id
          name: displayName
          identifier
        }
        probability
        fragments
      }
    }
  }
`
