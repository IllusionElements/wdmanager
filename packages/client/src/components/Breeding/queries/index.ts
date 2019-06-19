import gql from "graphql-tag.macro"
const DRAGON_FRAGMENT = gql`
  fragment DragonChild on Dragon {
    _id
    name: displayName
    identifier
    isAttainable
  }
`

const BREED_FRAGMENT = gql`
  fragment Breed on Deck {
    _id
    dragon {
      ...DragonChild
    }
    fragments
    probability
  }
`
const PARENT_FRAGMENT = gql`
  fragment ParentFragment on Parents {
    _id
    firstParent {
      ...DragonChild
    }
    secondParent {
      ...DragonChild
    }
  }
`
export const BreedingFragments = {
  DRAGON_FRAGMENT,
  BREED_FRAGMENT,
  PARENT_FRAGMENT
}
export const CHILD_QUERY = gql`
  query child($dragon: String!, $filters: FilterParams!) {
    dragon(name: $dragon, filter: $filters) {
      ...DragonChild
      children {
        _id
        parents {
          secondParent {
            ...DragonChild
          }
        }
        eggCombos: children {
          ...Breed
        }
      }
    }
  }
`
export const CHILDREN_QUERY = gql`
  query getChildrenOfPair($parents: Parent!) {
    dragonChildren(parents: $parents) {
      _id
      deck
      parents {
        _id
        firstParent {
          ...DragonChild
        }
        secondParent {
          ...DragonChild
        }
      }
      children {
        ...Breed
      }
    }
  }
`

export const PARENTS_QUERY = gql`
  query getParentsForChild($child: Child!) {
    dragonParents(child: $child) {
      _id
      breedChance
      dragon {
        ...DragonChild
      }
      parents {
        ...ParentFragment
        children {
          ...Breed
        }
      }
    }
  }
`
