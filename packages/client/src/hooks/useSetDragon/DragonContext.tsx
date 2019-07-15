import React, { useReducer, createContext } from "react"
import produce from "immer"
import {
  Actions,
  DragonQueryAction,
  dragons,
  children,
  ParentAction,
  FetchParentActions,
  DragonActions,
  TierActions
} from "./dragons"
import { isEqual } from "lodash"
import { useContext } from "react"

const initialState = { dragons, children, tier: -1 }
type IDragonContext = [typeof initialState, React.Dispatch<Actions>]
export const DragonContext = createContext<IDragonContext>({} as IDragonContext)
export const useDragons = (position: "first" | "second") => {
  const [
    {
      dragons: {
        [position]: { dragons }
      }
    }
  ] = useContext(DragonContext)

  return dragons
}
export const useDragonsDispatch = () => useContext(DragonContext)[1]
const DragonContextProvider = React.memo(DragonContext.Provider, (prev, next) =>
  isEqual(prev.value[0], next.value[0])
)
type State = typeof initialState
type ActionReducer<T, A = any> = (
  prev: T,
  actions: A,
  update: (state: (draft: T) => any) => T
) => T
const ParentActionReducer = (
  prev: State,
  actions: ParentAction,
  update: (state: (draft: typeof prev) => any) => typeof prev
) => {
  switch (actions.type) {
    case DragonQueryAction.SET_FIRST_PARENT:
      return update(
        draft => void (draft.dragons.first.name = actions.payload.parent)
      )
    case DragonQueryAction.SET_SECOND_PARENT:
      return update(
        draft => void (draft.dragons.second.name = actions.payload.parent)
      )
    default:
      return prev
  }
}
const FetchParentActionReducer: ActionReducer<State, FetchParentActions> = (
  state,
  actions,
  update
) => {
  switch (actions.type) {
    case DragonQueryAction.FETCH_FIRST_PARENT_RESULTS:
      return update(
        draft => void (draft.dragons.first.dragons = actions.payload.results)
      )
    case DragonQueryAction.FETCH_SECOND_PARENT_RESULTS:
      return update(
        draft => void (draft.dragons.second.dragons = actions.payload.results)
      )
    default:
      return state
  }
}
const MainReducer: ActionReducer<State, DragonActions | TierActions> = (
  prev,
  actions,
  update
) => {
  switch (actions.type) {
    case DragonQueryAction.UPDATE_TIER:
      return update(draft => void (draft.tier = actions.payload.tier))
    case DragonQueryAction.SET_DRAGON_RESULTS:
      return update(draft => void (draft.children = actions.payload.dragons))
    default:
      return prev
  }
}

type ReducerState<T> = T extends ActionReducer<infer State> ? State : never
type ReducerAction<T> = T extends ActionReducer<any, infer Action>
  ? Action
  : never
const useCombineReducer = <R extends ActionReducer<any, any>, I>(
  reducers: R[],
  initializerArg: I & ReducerState<R>,
  initializer?: (arg: I & ReducerState<R>) => ReducerState<R>
) => {
  const reducer = React.useReducer<
    React.Reducer<typeof initialState, ReducerAction<R>>
  >((prev, actions) => {
    return reducers.reduce(
      (state, reducer) =>
        reducer(state, actions, (a: (a: typeof state) => any) =>
          produce(prev, a)
        ),
      prev
    )
  }, initializerArg)

  return reducer
}
export const DragonProvider: React.FC = props => {
  const reducer = useCombineReducer(
    [ParentActionReducer, FetchParentActionReducer, MainReducer],
    initialState
  )

  return (
    <DragonContext.Provider value={reducer}>
      {props.children}
    </DragonContext.Provider>
  )
}
