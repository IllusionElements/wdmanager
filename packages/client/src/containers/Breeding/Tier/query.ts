import gql from "graphql-tag.macro"
import { ApolloClient } from "apollo-client"

const GET_TIERS = gql`
  query AllDragonTiers {
    tiers {
      _id
      tier
      name
    }
  }
`

export type GraphQLResponse<T, K extends string> = { [Key in K]-?: T }
export type TierQueryOperation = GraphQLResponse<GetTiers, "AllDragonTiers">
export interface Tier {
  _id: string
  tier: number
  name: string
}
export interface GetTiers {
  tiers: Tier[]
}
export const queryTiers = async (client: ApolloClient<unknown>) => {
  const {
    data: { AllDragonTiers }
  } = await client.query<TierQueryOperation>({
    query: GET_TIERS
  })
  return AllDragonTiers
}
