import { ApolloServer } from "apollo-server-express"
import dotenv from "dotenv"
import context from "./context"
dotenv.config({
  debug: true
})

// type DragonParents {
//   _id: ID!
//   breedChance: Float!
//   deck: String!
//   distribution: Int!
//   dragon: Dragon!
//   parents: [Dragon!]!
// }

// const setup =
export default async () => {
  const Schema = await import("./initializeSchema")
  return new ApolloServer({
    schema: await Schema.init(),
    context
  })
}
