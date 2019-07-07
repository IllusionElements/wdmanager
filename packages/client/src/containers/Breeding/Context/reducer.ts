import produce from "immer"
import { DragonActions } from "constants/Parents"
import { State as ParentState } from "./state"
type ParentAction<T extends DragonActions> = IAction<
  T,
  Record<
    T extends DragonActions.SET_FIRST_PARENT
      ? "first"
      : T extends DragonActions.SET_SECOND_PARENT
      ? "second"
      : never,
    string
  >
>

type ParentActions = $Value<{ [K in DragonActions]: ParentAction<K> }>
type TierActions = {
  type: "SELECT_TIER"
  payload: { tier: number }
}
const updateParentState = (action: BreedingActions) =>
  produce(draft => {
    const state = draft as ParentState
    switch (action.type) {
      case DragonActions.SET_FIRST_PARENT:
        state.parents.first = action.payload.first

        break
      case DragonActions.SET_SECOND_PARENT:
        state.parents.second = action.payload.second

        break
    }
  })
type BreedingActions = ParentActions | TierActions
const reducer = (state: ParentState, action: BreedingActions) => {
  const setState = updateParentState(action)
  switch (action.type) {
    case DragonActions.SET_FIRST_PARENT:
    case DragonActions.SET_SECOND_PARENT:
      return setState(state)
    case "SELECT_TIER": {
      const withState = produce(
        draft => void (draft.currentTier = action.payload.tier)
      )
      return withState(state)
    }
    default:
      return state
  }
}
export default reducer
