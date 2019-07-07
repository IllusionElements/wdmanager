export interface Results {
  first: string
  second: string
}

const parents: Results = {
  first: "",
  second: ""
}

const parentState: {
  parents: Results
  currentTier: string
} = {
  parents,
  currentTier: ""
}
type Identity<T> = T
export interface State extends Identity<typeof parentState> {}
export default parentState
