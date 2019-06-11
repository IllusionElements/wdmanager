import { ApolloServer, makeExecutableSchema } from "apollo-server-express"
import dotenv from "dotenv"
import { Breeding, Dragon, Tier, Deck, Query } from "./gql/resolvers"
// import { Rarity } from "@manager/services"
import typeDefs from "./schema"
dotenv.config({
  debug: true
})
// Rari
const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Breeding: () => Breeding,
    Dragon,
    Tier,
    Deck,
    Query,
    Rarity: {
      COMMON: "common",
      RARE: "rare",
      EPIC: "epic",
      LEGENDARY: "legendary",
      MYTHIC: "mythic"
    },
    Level: {
      xp: ({ upgradeXP }) => upgradeXP
    }
  },
  resolverValidationOptions: {
    requireResolversForResolveType: false
  }
})
// console.log(
//   (Rarity = {
//     COMMON: "common",
//     RARE: "rare",
//     EPIC: "epic",
//     LEGENDARY: "legendary",
//     MYTHIC: "mythic"
//   })
// )
export const server = new ApolloServer({
  schema,
  context: async () => {
    const { default: ctx } = await import("./gql/resolvers/ResolverContext")
    const secrets = new Map().set("MONGO_URL", process.env.MONGO_URL)
    return { ...ctx, secrets }
  }
})
