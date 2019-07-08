// / <reference path="./utils.d.ts" />
import { lazy } from "@manager/utils"
const lazyBreedResolver = key => lazy(() => import("./breeding"), key)
const breedingResolvers = {
  dragonChildren: lazyBreedResolver("dragonChildren"),
  dragonParents: lazyBreedResolver("dragonParents")
}
/**
 * Each item in this object maps to a graphQL query request
 * the methods are used to resolve the fields specified in the graphql schema
 * Each function is lazyLoaded on demand
 */
const Query = {
  tiers: lazy(() => import("./getTiers"), "getTiers"),
  dragons: lazy(() => import("./findAllDragons"), "findAllDragons"),
  tier: lazy(() => import("./tier"), "tier"),
  dragon: lazy(() => import("./dragon"), "dragon"),
  ...breedingResolvers
}
export default Query
const importDefault = async path => {
  const module_ = await import(path)

  return module_.default
}

importDefault("../ResolverContext")
  .then(c => Query.tiers(null, null, c))
  .then(r => {})
