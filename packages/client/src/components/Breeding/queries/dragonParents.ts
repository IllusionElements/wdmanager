import gql from "graphql-tag.macro"

export default gql`
  query getParentsForChild($dragon: Child!) {
    dragonParents(child: $dragon) {
      _id
    }
  }
`
