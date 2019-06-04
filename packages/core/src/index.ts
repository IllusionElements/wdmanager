import { ApolloServer } from "apollo-server"
import dotenv from "dotenv"
import { Query, Dragon, TierType as Tier } from "./gql/resolvers"
import typeDefs from "./schema"
dotenv.config({
  debug: true
})
export const server = new ApolloServer({
  typeDefs,
  context: async () => {
    const { default: ctx } = await import("./gql/ResolverContext")
    const secrets = new Map().set("MONGO_URL", process.env.MONGO_URL)
    return { ...ctx, secrets }
  },
  resolvers: {
    Query,
    Dragon,
    Tier
  }
})
