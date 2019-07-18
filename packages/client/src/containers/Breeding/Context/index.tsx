import React, { useCallback, useMemo, useContext } from "react"

import { DragonState, Dragon } from "../Dragon/state"
import { combine } from "../../utils"
import Parents, { State as ParentState } from "./state"
import dragonReducer from "../Dragon/reducer"
import contextReducer from "./reducer"
import { DragonActions } from "constants/Parents"
export interface State extends ParentState, Pick<DragonState, "dragons"> {}
const intialState: State = {
  dragons: [],
  ...Parents
}
const mainReducer = combine(dragonReducer, contextReducer)
type ContextValue = [
  DragonState | ParentState,
  React.Dispatch<
    | {
        type: "SET_DRAGONS"
        payload: Dragon[]
      }
    | IAction<DragonActions.SET_FIRST_PARENT, Record<"first", string>>
    | IAction<DragonActions.SET_SECOND_PARENT, Record<"second", string>>
    | {
        type: "SELECT_TIER"
        payload: { tier: number }
      }
  >
]
const BreedingContext = React.createContext<ContextValue | null>(null)
const BreedProvider: React.FC = props => {
  const [state, dispatch] = React.useReducer(mainReducer, intialState as State)

  const actions = useMemo(() => [state, dispatch], [state]) as ContextValue
  return (
    <BreedingContext.Provider value={actions}>
      {props.children}
    </BreedingContext.Provider>
  )
}

export const useBreed = () => {
  const [state, dispatch] = useContext(BreedingContext)!
  const updateParent = useCallback(
    (type: keyof $Value<State, "parents">) => (identifier: string) => {
      if (type === "first") {
        dispatch({
          type: DragonActions.SET_FIRST_PARENT,
          payload: { first: identifier }
        })
      } else if (type === "second") {
        dispatch({
          type: DragonActions.SET_SECOND_PARENT,
          payload: { second: identifier }
        })
      }
    },
    [dispatch]
  )

  const updateParents = useMemo(() => {
    const first = updateParent("first")
    const second = updateParent("second")
    return {
      first,
      second
    }
  }, [updateParent])

  const updateTier = useCallback(
    (tier: number) =>
      dispatch({
        type: "SELECT_TIER",
        payload: {
          tier
        }
      }),
    [dispatch]
  )
  const updateDragons = useCallback(
    (dragons: $Value<State, "dragons">) =>
      dispatch({ type: "SET_DRAGONS", payload: dragons }),
    [dispatch]
  )
  const actionDispatchers = {
    updateTier,
    updateParents,
    updateDragons
  }
  return [state, actionDispatchers] as [State, typeof actionDispatchers]
}
type FCProps<T> = T extends React.FC<infer P> ? P : never
export const withBreed = <T extends React.PropsWithChildren<any>>(
  Component: React.FC<T>
) => (props: FCProps<typeof Component>) => (
  <BreedProvider>
    <Component {...props} />
  </BreedProvider>
)

export { BreedProvider, useBreed as default }
