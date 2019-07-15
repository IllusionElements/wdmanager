import React from "react"

type Thunk<S, A> = (dispatch: React.Dispatch<A>, getState: () => S) => void
type ThunkDispatch<S, A> = Thunk<S, A> | A

const isThunkable = (a: unknown): a is AnyFunctor => typeof a === "function"
export function useThunk<R extends React.Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I & React.ReducerState<R>,
  initializer: (arg: I & React.ReducerState<R>) => React.ReducerState<R>
): [
  React.ReducerState<R>,
  (action: ThunkDispatch<React.ReducerState<R>, React.ReducerAction<R>>) => void
] {
  const [state, dispatch] = React.useReducer<R, I>(
    reducer,
    initializerArg,
    initializer
  )

  const thunkDispatch = React.useCallback(
    (action: ThunkDispatch<React.ReducerState<R>, React.ReducerAction<R>>) => {
      if (isThunkable(action)) {
        action(dispatch, () => state)
      } else {
        dispatch(action)
      }
    },
    [state]
  )

  return [state, thunkDispatch]
}
