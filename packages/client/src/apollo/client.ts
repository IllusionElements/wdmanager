import { ApolloClient } from "apollo-client"
import config from "./config"
import { ApolloCache } from "apollo-cache"
import { DocumentNode } from "graphql"
import produce, { Draft } from "immer"
import gql from "graphql-tag.macro"
// import { string } from "prop-types";
interface CacheParams {
  __typename: string
  id: string | number
}
type PartialKey<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
type getCacheKey = (parameters: CacheParams) => string
interface Context<T> {
  cache: ApolloCache<T>
  getCacheKey: getCacheKey
}
interface ApolloStateContext<T> {
  context: Context<T>
  fragment: DocumentNode
  variables:
    | PartialKey<CacheParams, "id">
    | Omit<CacheParams, "id"> & ({ getId: () => CacheParams["id"] })
}

export const createMutation = <
  T extends {},
  R extends { update?: (draft: Draft<T>) => T | void } = {}
>(
  {
    variables: { __typename, ...variables },
    context: { cache, getCacheKey },
    fragment
  }: ApolloStateContext<T>,
  options?: R
): R extends { update: (draft: Draft<T>) => T | void }
  ? null
  : <Recipe extends (draft: Draft<T>) => any>(recipe: Recipe) => void => {
  const id = getCacheKey({
    __typename,
    id:
      "id" in variables
        ? variables.id!
        : "getId" in variables
        ? variables.getId()
        : ""
  })

  const results = cache.readFragment<T, never>({ fragment, id })
  if (options && typeof options.update === "function") {
    const { update } = options
    cache.writeData({
      id,
      data: produce(results, update)
    })
    return null as R extends { update: (draft: Draft<T>) => T | void }
      ? null
      : <Recipe extends (draft: Draft<T>) => any>(recipe: Recipe) => void
  }
  const updateData = <Recipe extends (draft: Draft<T>) => any>(
    recipe: Recipe
  ) => {
    const data: T = produce(results, recipe)
    cache.writeData({
      id,
      data
    })
  }

  return updateData as R extends { update: (draft: Draft<T>) => T | void }
    ? null
    : <Recipe extends (draft: Draft<T>) => any>(recipe: Recipe) => void
}

type MutationArgs = ArgumentType<typeof createMutation>
type MutationFn = MutationArgs[0]
interface MutationArg<T> extends Array<any> {
  0: ApolloStateContext<T>
  1: (draft: Draft<T>) => T | void
}
const createResolver = <T extends {}, TVars = any>(options: {
  getVariables: (variables: TVars) => MutationFn["variables"]
  getFragment: () => MutationFn["fragment"]
  update: MutationArg<T>[1]
}): QueryResolver<T, TVars> => (_root, vars, context) =>
  createMutation(
    {
      variables: options.getVariables(vars),
      context,
      fragment: options.getFragment()
    },
    options
  )
type QueryResolver<T, V> = (
  _root: T,
  variables: V,
  context: ApolloStateContext<T>["context"]
) => T | null

export default new ApolloClient({ ...config })
