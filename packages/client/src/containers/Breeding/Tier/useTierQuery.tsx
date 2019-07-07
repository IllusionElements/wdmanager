import { useEffect, useMemo, useReducer } from "react"
import useApollo from "hooks/useApollo"
import { TierState } from "./state"
import { setTiers } from "./actions"
import reducer from "./reducer"
import useBreed, { State } from "../Context"
export function useTierQuery() {
  const client = useApollo()
  const [{ currentTier }, { updateTier }] = useBreed() as [
    State,
    ReturnType<typeof useBreed>[1]
  ]
  const [{ tiers, loading }, dispatch] = useReducer(reducer, TierState)
  const addTiers = useMemo(() => setTiers(dispatch), [])
  useEffect(() => {
    async function load() {
      const { queryTiers } = await import("./query")
      const { tiers } = await queryTiers(client)
      addTiers(tiers)
    }
    load()
  }, [client, addTiers])
  return {
    updateTier,
    data: {
      currentTier,
      tiers
    },
    loading
  }
}
