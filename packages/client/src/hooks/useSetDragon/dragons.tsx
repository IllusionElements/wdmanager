type Keys = "first" | "second"
type DragonResults = {
  [K in Keys]: {
    name: string
    dragons: Dragon[]
  }
}
export const dragons: DragonResults = {
  first: {
    name: "",
    dragons: []
  },
  second: {
    name: "",
    dragons: []
  }
}
type Schema<T> = {
  [K in keyof T]: T[K] extends AnyFunctor ? ReturnType<T[K]> : T[K]
}
type Dragon = Schema<
  ArgumentType<
    typeof import("../../../../core/dist/gql/resolvers/Dragon/lazy").Dragon["rarity"]
  >[0]["_schema"]
> & {
  _id: string
} & { element: string }
export const children: Dragon[] = []
export const enum DragonQueryAction {
  SET_FIRST_PARENT = "SET_FIRST_PARENT",
  SET_SECOND_PARENT = "SET_SECOND_PARENT",
  SET_DRAGON_RESULTS = "SET_DRAGON_RESULTS",
  FETCH_FIRST_PARENT_RESULTS = "FETCH_FIRST_PARENT_RESULTS",
  FETCH_SECOND_PARENT_RESULTS = "FETCH_SECOND_PARENT_RESULTS",
  UPDATE_TIER = "UPDATE_TIER"
}
export interface DragonActions
  extends IAction<
    DragonQueryAction.SET_DRAGON_RESULTS,
    {
      dragons: typeof children
    }
  > {}
export interface TierActions
  extends IAction<DragonQueryAction.UPDATE_TIER, NumberRecord<"tier">> {}
type FetchParentKeys =
  | DragonQueryAction.FETCH_FIRST_PARENT_RESULTS
  | DragonQueryAction.FETCH_SECOND_PARENT_RESULTS
type ParentKeys<T> = Exclude<
  DragonQueryAction,
  DragonQueryAction.SET_DRAGON_RESULTS | T | DragonQueryAction.UPDATE_TIER
>
export interface ParentAction<
  K extends ParentKeys<FetchParentKeys> = ParentKeys<FetchParentKeys>
>
  extends IAction<
    K,
    {
      parent: string
    }
  > {}

export interface FetchParentActions<
  K extends FetchParentKeys = FetchParentKeys
> extends IAction<K, Record<"results", Dragon[]>> {}
export type Actions =
  | DragonActions
  | ParentAction<DragonQueryAction.SET_FIRST_PARENT>
  | ParentAction<DragonQueryAction.SET_SECOND_PARENT>
  | FetchParentActions<DragonQueryAction.FETCH_FIRST_PARENT_RESULTS>
  | FetchParentActions<DragonQueryAction.FETCH_SECOND_PARENT_RESULTS>
  | TierActions
export const noop = () => null
