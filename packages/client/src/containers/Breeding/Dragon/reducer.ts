type State = typeof import("./state").dragonState
type ActionSetter = typeof import("./actions").setDragon
type Action = ExtractAction<ActionSetter>
type Reducer = React.Reducer<State, Action>
const { assign: merge } = Object
const reducer: Reducer = (prevState, action) => {
  if (action.type === "SET_DRAGONS") {
    return merge({}, prevState, {
      dragons: action.payload
    })
  }
  return prevState
}

export default reducer
