export const createAction = <T extends IAction<any, any>>(
  type: DispatchAction<T>
) => (dispatch: ActionDispatch<T>) => (payload: DispatchPayload<T>) =>
  dispatch({
    type,
    payload
  })
