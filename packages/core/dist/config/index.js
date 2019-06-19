import { ApolloServer } from "apollo-server-express"
import dotenv from "dotenv"

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

const setup = async () => {
  const Schema = await import("./initializeSchema")
  return new ApolloServer({
    schema: await Schema.init(),
    context: async () => {
      const { default: ctx } = await import("../gql/resolvers/ResolverContext")
      const secrets = new Map().set("MONGO_URL", process.env.MONGO_URL)
      return { ...ctx, secrets }
    }
  })
}

export default setup
