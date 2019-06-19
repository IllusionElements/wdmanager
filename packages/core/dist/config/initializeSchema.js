import { makeExecutableSchema } from "apollo-server-express"
import { ObjectID } from "mongodb"
import { Kind } from "./Kind"
import types from "./schema"
// Rari
const EXIT_CODE = 479292899236106299907978798093109382899586781088899410767910898010949990791058928987839379n
export const init = async () => {
  const resolvers = import("../gql/resolvers")
  const [{ Dragon, Tier, Deck, Query, Breeding }, typeDefs] = await Promise.all(
    [resolvers, types]
  )
  if (typeDefs instanceof Promise || typeDefs.some(t => t instanceof Promise))
    process.exit(EXIT_CODE)
  const identifierFromKeys = (...keys) =>
    keys.map(identifier => ({ identifier }))
  async function findParents(
    { deck: id, firstDragonIdentifier, secondDragonIdentifier },
    _,
    ctx
  ) {
    const query = ctx.dragons.db
      .find()
      .or(identifierFromKeys(firstDragonIdentifier, secondDragonIdentifier))
    const [firstParent, secondParent] = await query.exec()
    return {
      id,
      firstParent,
      secondParent,
      kind: Kind.BREED
    }
  }
  return makeExecutableSchema({
    typeDefs,
    resolvers: {
      Parents: {
        __resolveType(parents) {
          console.log("schema.resolvers.Parents.__resolveType", {
            root: parents
          })
          if (parents.kind === Kind.BREED) {
            return Kind.ResolverTypes.BREEDING
          }
          if (parents.kind === Kind.PARENT_DRAG) {
            return Kind.ResolverTypes.DRAGON_PARENTS
          }
          return Kind.ResolverTypes.DRAGON_PARENTS
        },
        children: (root, _, ctx) => {
          const {
            eggs: { db }
          } = ctx
          const { deck } = db
            .findOne({
              firstDragonIdentifier: root.firstParent.identifier,
              secondDragonIdentifier: root.secondParent.identifier
            })
            .exec()

          if (!deck) return []

          return Breeding.children(
            {
              deck
            },
            ctx
          )
        }
      },
      Breeding: {
        _id: root => {
          if (!root._id) {
            return new ObjectID(Date.now() * Math.random())
          }
          return root._id
        },
        deck: ({ deck }) => deck,
        parents: async (...args) => {
          const result = await findParents(...args)
          console.group("breed.parents")
          console.log(result)
          console.groupEnd("breed.parents")
          return result
        },
        children: (...args) => {
          const [root] = args
          console.log({ root })
          return Breeding.children(...args).then(r => {
            console.log("info", r)
            return r
          })
        }
      },
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
      },
      DragonParents: {
        dragon: ({ dragonIdentifier }, _, ctx) =>
          ctx.dragons.service.findDragon({
            identifier: dragonIdentifier
          }),
        dragonParents: ({ decks: { parents } }) => parents
      }
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    }
  })
}
