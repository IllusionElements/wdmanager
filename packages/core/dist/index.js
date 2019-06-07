import { ApolloServer } from "apollo-server"
import dotenv from "dotenv"
import { Query, Dragon, TierType as Tier } from "./gql/resolvers"
// import typeDefs from "./schema"
dotenv.config({
  debug: true
})
// export const server = new ApolloServer({
//   typeDefs,
//   context: async () => {
//     const { default: ctx } = await import("./gql/resolvers/ResolverContext")
//     const secrets = new Map().set("MONGO_URL", process.env.MONGO_URL)
//     return { ...ctx, secrets }
//   },
//   resolvers: {
//     Query,
//     Dragon,
//     Tier
//   }
// })
const parents = {
  first: "T1C1WFdragon",
  second: "T1C1SEdragon"
}
import("@manager/services").then(
  //ts-check
  /**
   * @param {typeof import('../../services/dist/index.js')} manager
   */
  async ({ Decks, Eggs }) => {
    const [res] = await Eggs.aggregate()
      .match({
        $and: [
          {
            firstDragonIdentifier: "T1C1WFdragon"
          },
          {
            secondDragonIdentifier: "T1C1SEdragon"
          }
        ]
      })
      .exec()

    console.log(res)

    const [data] = await Decks.find({
      identifier: res.possibleRawEggDistribution.type
    }).exec()

    console.log({ data: data })
  }
)
