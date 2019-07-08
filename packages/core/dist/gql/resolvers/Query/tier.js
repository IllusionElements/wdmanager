import produce from "immer"
import { dragons, name } from "../Tier"
const reverse = ([head, ...tail]) =>
  head === undefined && tail.length === 0 ? [] : [...reverse(tail), head]
const head = ([h, ...tail]) => h
const pipe = (h, ...g) => (...args) => g.reduce((x, f) => f(x), h(...args))

const last = pipe(
  reverse,
  head
)
const lruKeys = new WeakMap()

const addLRUKey = i =>
  produce(draft => {
    const [item] = draft.splice(i, 1)
    draft.unshift(item)
  })
function setLRUKey(key, ctx) {
  if (!lruKey.has(ctx)) {
    lruKey.set(ctx, [key])
  } else {
    const keys = lruKey.get(ctx)
    const addKeyTo = produce(draft => void draft.unshift(key))

    const index = keys.indexOf(key)
    if (index > -1) {
      const addLRUKeyTo = addLRUKey(index)
      addLRUKeyTo(keys)
    } else {
      addKeyTo(keys)
    }
  }
}
const getLRUKey = ctx => {
  const keys = lruKeys.get(ctx)

  const key = keys.length === 1 ? keys[0] : last(keys)

  setLRUKey(key, ctx)
  return key
}
class CacheLoader {
  cache = new Map()
  constructor(loader, { ttl, type } = {}) {
    this.loaderFunc = loader
    if (ttl && type === "lru") {
      setInterval(() => {
        const lru = getLRUKey(this)
        this.cache.delete(key)
      }, ttl)
    }
  }
  async load(_id) {
    if (this.cache.has(_id)) {
      return this.cache.get(_id)
    }

    const results = await this.loaderFunc([_id])
    this.cache.set(_id, results)
    setLRUKey(_id, this)
    return results
  }
}
export class Tier {
  constructor(root) {
    console.log({ root })
    this.tierName = root.tierName
    this.tier = root.tier
    this._id = root._id
  }

  async dragons(...args) {
    return dragons(...args)
  }

  async dragon(_, { name: identifier }, ctx) {
    const dragon = await ctx.dragons.db
      .findOne({
        identifier,
        defaultTierNumber: this.tier
      })
      .exec()

    return dragon
  }
}
export const tier = async (_, { id }, ctx) => {
  const cursor = ctx.tiers.db.findOne({
    _id: id
  })

  const data = await cursor.exec()
  const tier = new Tier(data)

  return tier
}
