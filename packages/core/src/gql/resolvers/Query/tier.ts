import { ResolverContext } from "../ResolverContext"

export const tier = async (_: any, key: string, ctx: ResolverContext) => {
  const cursor = ctx.tiers.db.find({
    identifer: key
  })
  const data = await cursor.exec()
  return data
}
