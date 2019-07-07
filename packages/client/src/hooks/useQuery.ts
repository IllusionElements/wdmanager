import { useState, useEffect, useReducer, useCallback } from "react"
import { DocumentNode, GraphQLError } from "graphql"
import * as Apollo from "react-apollo"
import useApollo from "./useApollo"

export enum QueryActions {
  SET_DATA = "SET_DATA",
  SET_LOADING_STATUS = "SET_LOADING_STATUS",
  SET_ERROR_STATUS = "SET_ERROR_STATUS"
}
export const queryReducer = <State>(
  prevState: {
    data: State
    loading: boolean
    error?: readonly GraphQLError[]
  },
  actions:
    | IAction<QueryActions.SET_DATA, State>
    | IAction<QueryActions.SET_LOADING_STATUS, boolean>
    | IAction<
        QueryActions.SET_ERROR_STATUS,
        { error: true; messages: readonly GraphQLError[] } | { error: false }
      >
) => {
  switch (actions.type) {
    case QueryActions.SET_DATA:
      return {
        ...prevState,
        data: actions.payload
      }
    case QueryActions.SET_LOADING_STATUS:
      return {
        ...prevState,
        loading: actions.payload
      }
    case QueryActions.SET_ERROR_STATUS: {
      if (actions.payload.error) {
        return {
          ...prevState,
          error: actions.payload.messages
        }
      }
      return {
        ...prevState,
        error: undefined
      }
    }
    default:
      return prevState
  }
}
function useQuery<
  State = {},
  OperationVariables extends Apollo.OperationVariables = {}
>(
  query: DocumentNode,
  options: { onMount: boolean; variables?: OperationVariables }
) {
  const client = useApollo()
  const [state, dispatch] = useReducer(queryReducer, {} as any)
  const runQuery = useCallback(
    async (variables?: OperationVariables) => {
      try {
        const { data, loading } = await client.query<State, OperationVariables>(
          {
            query,
            variables
          }
        )
        dispatch({
          type: QueryActions.SET_ERROR_STATUS,
          payload: { error: false }
        })
        dispatch({
          type: QueryActions.SET_DATA,
          payload: data
        })
        dispatch({
          type: QueryActions.SET_LOADING_STATUS,
          payload: loading
        })
      } catch (e) {
        dispatch({
          type: QueryActions.SET_ERROR_STATUS,
          payload: { error: true, messages: e.messages }
        })
      }
    },
    [client, query]
  )
  useEffect(() => {
    if (options.onMount) {
      runQuery(options.variables)
    }
  }, [runQuery, options.variables, options.onMount])

  return [state, runQuery]
}
