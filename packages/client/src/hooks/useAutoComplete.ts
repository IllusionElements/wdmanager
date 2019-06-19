import { useReducer } from "react"
import useApollo from "./useApollo"
import { DocumentNode } from "graphql"
import { OperationVariables } from "react-apollo"
const defaultState = {
  activeSuggestion: 0,
  filteredSuggestions: [],
  showSuggestions: false,
  // What the user has entered
  userInput: ""
}
const useAutoComplete = <T extends any[]>(data: T) => {}
