import { Reducer } from "react"
import produce from "immer"
import { TierActions, TierActionEnum } from "./actions"
import { ITierState } from "./state"
const identity = <S>(s: S): S => s
export const tierReducer: Reducer<ITierState, TierActions> = (
  prevState,
  action
) => {
  const actionReducers = {
    [TierActionEnum.SET_CURRENT_TIER]: produce(draft => {
      draft.currentTier = action.payload
      draft.loading = false
    }),
    [TierActionEnum.SET_TIERS]: produce(
      draft => void (draft.tiers = action.payload)
    )
  }
  const reduceState = actionReducers[action.type] || identity
  return reduceState(prevState)
}

export default tierReducer
