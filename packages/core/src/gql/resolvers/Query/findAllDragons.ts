import { IDragon } from "@manager/services"
import { ResolverContext } from "../ResolverContext"
// Aggregation lookup for levels
const levelLookup = {
  from: "levels",
  localField: "identifier",
  foreignField: "identifier",
  as: "levels"
}
export const findAllDragons = async (
  _root: any,
  _: any,
  context: ResolverContext
) => {
  const {
    dragons: { db }
  } = context
  const aggregate = db.aggregate()
  const dragonsLookup = aggregate.lookup(levelLookup)
  const data = await dragonsLookup.exec()
  if (
    data.rarity &&
    ![...context.dragons.service.rarity.values()].some(
      rarity => rarity === data.rarity
    )
  ) {
    return {
      ...data,
      rarity: context.dragons.service.rarity.get(data.rarity)
    } as IDragon[]
  }
  return data as IDragon[]
}
