import { IDragon } from "@manager/services"
import { ResolverContext } from "../ResolverContext"
export function getTiers(_root: IDragon, _: any, context: ResolverContext) {
  return context.tiers.service.getAllTiers()
}
