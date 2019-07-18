import Dataloader from "dataloader"
import ctx from "../gql/resolvers/ResolverContext"
const findWhereKeyIn = (db, key, keys) =>
  db
    .where(key)
    .in(keys)
    .exec()
const defaultLoader = (key, db = ctx[key].db) => keys => {
  if (keys.length === 1) {
    const [id] = keys
    return db
      .findOne({
        [key]: id
      })
      .exec()
  }

  return db
    .where(key)
    .in(keys)
    .exec()
}
function createLoaders({ tiers, dragons }) {
  const tierLoader = defaultLoader("tiers", tiers)

  const dragonLoader = key => new Dataloader(defaultLoader(key, dragons))
  const dragons = {
    id: dragonLoader("_id"),
    displayName: dragonLoader("displayName")
  }
  return {
    tiers: new Dataloader(tierLoader),
    dragons
  }
}
export default () => {
  const {
    tiers: { db: tiers },
    dragons: { db: dragons }
  } = ctx
  const tierIDLoader = new Dataloader(keys => {
    if (keys.length > 1) {
      return findWhereKeyIn(tiers, "_id", keys)
    }

    return tiers
      .findOne({
        _id: keys[0]
      })
      .exec()
  })

  const secrets = new Map().set("MONGO_URL", process.env.MONGO_URL)
  return {
    ...ctx,
    secrets,
    loader: createLoaders({ tiers, dragons }),
    tierIDLoader
  }
}
