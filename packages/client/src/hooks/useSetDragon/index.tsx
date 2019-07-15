import { useContext, useCallback, useState, useMemo } from "react"
import useApollo from "../useApollo"
import { DocumentNode } from "graphql"
import { debounce } from "lodash"
import {
  Actions,
  DragonQueryAction,
  DragonActions,
  noop,
  ParentAction
} from "./dragons"
import { DragonContext } from "./DragonContext"
import ApolloClient from "apollo-client"
const queryServer = debounce(
  async ({
    query,
    client,
    dragons,
    dispatch
  }: {
    query: DocumentNode
    client: ApolloClient<unknown>
    dragons: Record<"first" | "second", string>
    dispatch: React.Dispatch<DragonActions>
  }) => {
    const { data } = await client.query({
      query,
      variables: { ...dragons }
    })
    dispatch({
      type: DragonQueryAction.SET_DRAGON_RESULTS,
      payload: data
    })
    return data.dragons
  }
)
// debounce, 100)
const createThunk = <A extends IAction<any, any>>(
  type: A extends IAction<infer Type, any> ? Type : string
) => <D extends React.Dispatch<A>>(dispatch: D) => (
  payload: ActionPayload<A>
) => {
  const action = { type, payload } as A
  return dispatch(action)
}
const getIn = <T, K extends keyof T, KK extends keyof T[K]>(
  target: T,
  keys: K[],
  key: KK
) => {
  const first = keys.reduce(
    (tar, k) => ({
      ...tar,
      [k]: target[k][key]
    }),
    {} as any
  )

  return first as { [Key in K]: T[K][KK] }
}
const thunks = {
  first: createThunk<ParentAction>(DragonQueryAction.SET_FIRST_PARENT),
  second: createThunk<ParentAction>(DragonQueryAction.SET_SECOND_PARENT)
}
export function useSetDragons(query: DocumentNode) {
  const client = useApollo()
  const [state, dispatch] = useContext(DragonContext)
  const dispatchDragon = useCallback(
    (payload: ActionPayload<DragonActions>) =>
      dispatch({
        type: DragonQueryAction.SET_DRAGON_RESULTS,
        payload
      }),
    [dispatch]
  )
  const parents = useMemo(() => {
    const actions = ["first", "second"] as const
    return actions.reduce(
      (T, K) => ({
        ...T,
        [K]: thunks[K](dispatch)
      }),
      {}
    ) as { [K in keyof typeof thunks]: ReturnType<(typeof thunks)[K]> }
  }, [dispatch])

  const dispatchParents = (field: "first" | "second") => (parent: string) => {
    const payload = { parent }
    switch (field) {
      case "first":
        parents.first(payload)
        break
      case "second":
        parents.second(payload)
        break
      default:
        noop()
    }
  }
  const hasParents = () =>
    state.dragons.first.name !== "" && state.dragons.second.name !== ""

  const onSelect: React.EventHandler<
    React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  > = () => {
    if (hasParents)
      queryServer({
        query,
        client,
        dragons: getIn(state.dragons, ["first", "second"], "name"),
        dispatch
      })
  }
  const methods = {
    onSelect,
    queryServer,
    dispatch: {
      parents: dispatchParents,
      dragons: dispatchDragon
    }
  } as const

  return [methods, client] as const
}
