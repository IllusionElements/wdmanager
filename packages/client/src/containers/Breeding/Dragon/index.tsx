import Downshift from "downshift"
import gql from "graphql-tag.macro"
import { useSetDragons } from "hooks/useSetDragon"
import { DragonContext } from "hooks/useSetDragon/DragonContext"
import { DragonQueryAction, noop } from "hooks/useSetDragon/dragons"
import { debounce } from "lodash"
import React, { useContext, useEffect, useState } from "react"

const FIND_DRAGON_TIER = gql`
  query FindDragonByTier($tier: String!, $dragon: String!) {
    tier(key: $tier) {
      _id
      dragon(name: $dragon) {
        _id
        identifier
        displayName
        element
      }
    }
  }
`
const DragonQuery: React.FC<{
  position: "first" | "second"
  children: ReactPropsType<typeof Downshift>["children"]
}> = ({ position, children }) => {
  const [{ tier }, dispatch] = useContext(DragonContext)
  const [methods, client] = useSetDragons(FIND_DRAGON_TIER)
  const [currentQuery, setQuery] = useState("")
  const debouncedUpdate = React.useRef({
    update: debounce(async (dragon: string) => {
      console.log("ran")
      const type =
        position === "first"
          ? DragonQueryAction.FETCH_FIRST_PARENT_RESULTS
          : DragonQueryAction.FETCH_SECOND_PARENT_RESULTS
      dragon = escape(dragon)
      const variables: {
        dragon: typeof dragon
        tier?: number
      } = { dragon }
      if (tier > -1) {
        variables.tier = tier
      }
      const { data: results } = await client.query({
        query: FIND_DRAGON_TIER,
        variables
      })

      console.log(results)
      if (!Array.isArray(results.length)) {
        throw new TypeError("results is not a array")
      }
      dispatch({
        type,
        payload: {
          results
        }
      })
    })
  })

  useEffect(() => {
    if (currentQuery !== "") {
      const { update } = debouncedUpdate.current
      update(currentQuery)
      return () => update.cancel()
    }
    return noop
  }, [currentQuery])
  return (
    <Downshift
      onSelect={methods.onSelect}
      onChange={setQuery}
      inputValue={currentQuery}
    >
      {children}
    </Downshift>
  )
}

export default DragonQuery
