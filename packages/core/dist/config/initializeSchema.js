import { makeExecutableSchema } from "apollo-server-express"
import { ObjectID } from "mongodb"
import { Kind } from "./Kind"
import types from "./schema"
// Rari
const EXIT_CODE = 47929289923610629990797879809n
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
    [{ deck: id, firstDragonIdentifier, secondDragonIdentifier, ...deck }],
    _,
    ctx
  ) {
    const query = ctx.dragons.db
      .find()
      .or(identifierFromKeys(firstDragonIdentifier, secondDragonIdentifier))
    const [firstParent, secondParent] = await query.exec()
    console.log({ firstDragonIdentifier, secondDragonIdentifier, deck, root })
    return {
      id,
      firstParent,
      secondParent,
      kind: Kind.BREED
    }
  }
  function createResolver(...keys) {
    return keys.reduce(
      (res, key) => ({
        ...res,
        [key]: (root, _, { dragons: { db } }) =>
          db.findOne(Reflect.get(root, key)).exec()
      }),
      {}
    )
  }
  return makeExecutableSchema({
    typeDefs,
    resolvers: {
      Parents: {
        // __resolveType(parents) {
        //   setTimeout(
        //     () =>
        //       process.nextTick(() =>
        //         console.log("schema.resolvers.Parents.__resolveType", {
        //           root: parents
        //         })
        //       ),
        //     1000
        //   )
        //   if (parents.kind === Kind.BREED) {
        //     return Kind.ResolverTypes.BREEDING
        //   }
        //   if (parents.kind === Kind.PARENT_DRAG) {
        //     return Kind.ResolverTypes.DRAGON_PARENTS
        //   }
        //   return Kind.ResolverTypes.DRAGON_PARENTS
        // },
        // ...createResolver("firstParent", "secondParent"),
        async firstParent(
          root,
          _,
          {
            dragons: { db }
          }
        ) {
          const res = await db.find({ _id: root.firstParent._id }).exec()
          console.log("first", { res, root })

          return res[0]
        },
        children: async (root, _, ctx) => {
          const {
            eggs: { db }
          } = ctx
          const { deck } = await db
            .findOne({
              firstDragonIdentifier: root.firstParent.identifier,
              secondDragonIdentifier: root.secondParent.identifier
            })
            .exec()

          if (!deck) return {}
          const result = await Breeding.children(
            {
              deck
            },
            ctx
          )

          return result.length === 1 ? result[0] : result
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
        children: async (...args) => {
          const [root] = args
          const res = await Breeding.children(...args)
          const flatRes = res.flat(1)
          console.log(Object.keys(root[0]._doc))
          return flatRes.length > 1 ? flatRes : flatRes[0]
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
