import { ApolloClient } from "apollo-client"
import { DocumentNode } from "apollo-link/lib/types"
import { combine } from "containers/utils"
import immerProduce, { Draft } from "immer"
import React, { Reducer, ReducerState as State } from "react"

export type Thunk<S, A> = (
  dispatch: React.Dispatch<A>,
  getState: () => S
) => void
export type ThunkDispatch<S, A> = Thunk<S, A> | A

const isThunkable = (a: unknown): a is AnyFunctor => typeof a === "function"
export type ReactThunk<R extends Reducer<any, any>> = [
  React.ReducerState<R>,
  (action: ThunkDispatch<React.ReducerState<R>, React.ReducerAction<R>>) => void
]
export function useThunk<R extends React.Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I & React.ReducerState<R>,
  initializer: (arg: I & React.ReducerState<R>) => React.ReducerState<R>
): ReactThunk<R>
//@ts-ignore
export function useThunk<R extends React.Reducer<any, any>>(
  reducer: R,
  initializerArg: React.ReducerState<R>,
  initializer?: undefined
): ReactThunk<R>
export function useThunk<R extends React.Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I,
  initializer: (arg: I) => State<R>
): ReactThunk<R> {
  const [state, dispatch] = React.useReducer(
    reducer,
    initializerArg,
    initializer
  )

  const thunkDispatch = React.useCallback(
    async (
      action: ThunkDispatch<React.ReducerState<R>, React.ReducerAction<R>>
    ) => {
      if (isThunkable(action)) {
        await action(dispatch, () => state)
      } else {
        dispatch(action)
      }
    },
    []
  )

  return [state, thunkDispatch]
}
export type ThunkType<T, S, A> = (payload: T) => Thunk<S, A>
interface TodoItem {
  _id: string
  item: string
}
interface IState {
  todos: TodoItem[]
}
export enum TodoActionTypes {
  ADD_ITEM,
  DELETE_ITEM
}
type ADD_TODO = IAction<TodoActionTypes.ADD_ITEM, TodoItem>
type DELETE_TODO = IAction<TodoActionTypes.DELETE_ITEM, Omit<TodoItem, "item">>
export type Actions = ADD_TODO | DELETE_TODO

const getTodos: ThunkType<string, IState, Actions> = item => {
  return async (dispatch, getState) => {
    const r = await fetch(item)
    const result: { item: string } = await r.json()
    dispatch({
      type: TodoActionTypes.ADD_ITEM,
      payload: {
        _id: Array.from(crypto.getRandomValues(new Uint32Array(3)), n =>
          n.toString(16)
        ).join(""),
        ...result
      }
    })
  }
}
export type Produce<S> = (
  state: S
) => (producer: (draft: Draft<S>) => void) => S
const produce = <S>(state: S) => (producer: ReturnType<Produce<S>>) =>
  immerProduce(state, producer)
export const createReducer = <S, A, P extends Produce<S> = Produce<S>>(
  reducer: (...args: [S, A, ReturnType<P>]) => S
): Reducer<S, A> => (prevState, action) =>
  reducer(prevState, action, produce(prevState) as ReturnType<P>) || prevState

export interface findDragon_dragon_levels_cost {
  __typename: "Cost"
  type: string | null
  amount: number | null
}

export interface findDragon_dragon_levels {
  __typename: "Level"
  _id: string
  level: number
  attack: number | null
  health: number | null
  reqLevel: number | null
  xp: number | null
  cost: (findDragon_dragon_levels_cost | null)[] | null
}

export interface findDragon_dragon {
  __typename: "Dragon"
  _id: string
  name: string | null
  description: string | null
  levels: (findDragon_dragon_levels | null)[] | null
  frags: number | null
  incubatorLevel: number | null
  incubatingTime: number | null
}

export interface GET_DRAGON_QUERY {
  dragon: findDragon_dragon
}

export interface findDragonVariables {
  id: string
}
interface DragonSearchItem {
  selectedDragon: string
  results: GET_DRAGON_QUERY[]
}
type DragonSearchState<T extends string | string> = {
  [K in T]: DragonSearchItem
}
enum ParentTypes {
  FIRST = "first",
  SECOND = "second"
}
type SearchState = {
  tier: number | null
  breeding: DragonSearchState<ParentTypes>
}
declare const state: SearchState
enum QueryActions {
  UPDATE_PARENT_NAME,
  UPDATE_BREED,
  SET_TIER
}
interface BreedPayload extends Pick<DragonSearchItem, "results"> {
  key: ParentTypes
}
type UPDATE_BREED_ACTION = IAction<QueryActions.UPDATE_BREED, BreedPayload>
type QUERY_ACTIONS = UPDATE_BREED_ACTION | TIER_ACTION
type TIER_ACTION = {
  type: typeof QueryActions[QueryActions.SET_TIER]
  tier: SearchState["tier"]
}
type ApolloReducer = React.Reducer<SearchState, QUERY_ACTIONS>

const tierReducer: React.Reducer<SearchState, TIER_ACTION> = createReducer(
  (prev, actions, reduce) => {
    switch (actions.type) {
      case QueryActions[QueryActions.SET_TIER]:
        return reduce(draft => void (draft.tier = actions.tier))
    }
    return prev
  }
)

interface ParentActions
  extends IAction<
    typeof QueryActions[QueryActions.UPDATE_PARENT_NAME],
    { key: ParentTypes; name: string }
  > {}
export const parentReducer: React.Reducer<
  SearchState,
  ParentActions
> = createReducer((prev, actions, reduce) => {
  switch (actions.type) {
    case QueryActions[QueryActions.UPDATE_PARENT_NAME]:
      return reduce(draft => {
        if (actions.payload.key === ParentTypes.FIRST) {
          draft.breeding.first.selectedDragon = actions.payload.name
        } else {
          draft.breeding.second.selectedDragon = actions.payload.name
        }
      })
  }
  return prev
})
export const queryReducer: ApolloReducer = createReducer(
  (prev, actions, reduce) => {
    switch (actions.type) {
      case QueryActions.UPDATE_BREED:
        return actions.payload.key === ParentTypes.FIRST
          ? reduce(
              draft =>
                void (draft.breeding[ParentTypes.FIRST].results =
                  actions.payload.results)
            )
          : reduce(
              draft =>
                void (draft.breeding[ParentTypes.SECOND].results =
                  actions.payload.results)
            )
      default:
        return prev
    }
  }
)
type ThunkActionType<T> = T extends ThunkDispatch<any, infer A> ? A : never

const reducers = combine(queryReducer, parentReducer, tierReducer)

const useDragons = () => useThunk(reducers, state)
const queryDragons = ({
  client,
  query,
  dragon
}: {
  client: ApolloClient<{
    dragons: DragonSearchItem
  }>
  query: DocumentNode
  dragon: string
}) => async (
  dispatch: React.Dispatch<React.ReducerAction<typeof reducers>>
) => {
  const { data: results } = await client.query({
    query,
    variables: { dragon }
  })
  const payload = { key: "first", results } as BreedPayload
  dispatch({
    type: QueryActions.UPDATE_BREED,
    payload
  })
}
declare const client: ApolloClient<any>
declare const query: DocumentNode

export default () => {
  const [, dispatch] = useDragons()

  dispatch(
    queryDragons({
      client,
      query,
      dragon: ""
    })
  )
}
