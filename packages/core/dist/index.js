import { ApolloServer } from "apollo-server-express"
import dotenv from "dotenv"
import express from "express"
import * as Resolvers from "./gql/resolvers"
import typeDefs from "./schema"
dotenv.config({
  debug: true
})
const { Query, Dragon, TierType: Tier } = Resolvers
const server = new ApolloServer({
  typeDefs,
  uri: "",
  context: async () => {
    const ctx = await import("./gql/ResolverContext")
    const secrets = new Map().set("MONGO_URL", process.env.MONGO_URL)
    console.log({ ctx })
    return { ...(ctx.default || {}), secrets }
  },
  dataSources: () => ({}),
  resolvers: {
    Query,
    Dragon,
    Tier,
    Rarity: new (class Rarity {
      constructor() {
        this.COMMON = "common"
        this.RARE = "rare"
        this.EPIC = "epic"
        this.LEGENDARY = "legendary"
        this.MYTHIC = "mythic"
      }
    })()
  },
  formatError: err => console.error(err)
})
const app = express()
const _listen = app.listen.bind(app)

app.listen = config => new Promise(resolve => _listen(config, resolve))
server.applyMiddleware({ app })
app.use(err => console.error(err))
app
  .listen({
    port: 4000
  })
  .then(() => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  })
