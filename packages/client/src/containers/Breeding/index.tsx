import React from "react"
import { Link, Route } from "react-router-dom"
import Button from "@material-ui/core/Button"
import Downshift from "downshift"
import useBreedCtx from "./Context"
import TierMenu from "./Tier"
import useApollo from "hooks/useApollo"
import gql from "graphql-tag.macro"
import { debounce } from "lodash"
import { Query } from "react-apollo"
import { Dragon } from "./Dragon/state"
import ApolloClient from "apollo-client"
const FIND_DRAGON_IN_TIER = gql`
  query FindDragonsInTier($tier: String!) {
    tier(key: $tier) {
      _id
      name
      dragons {
        _id
        displayName
        element
      }
    }
  }
`
const renderDragonItem = () => {}

const DragonMenu: React.FC<
  {
    currentTier: string
    setParent: VoidFunctor<string>
    getDragon: (e: string) => Promise<void>
    dragons: Dragon[]
  } & Pick<React.ComponentProps<typeof Downshift>, "children">
> = props => (
  <Downshift onInputValueChange={props.getDragon} onSelect={props.setParent}>
    {props.children}
  </Downshift>
)

// type $Tuple<T> = [T, T]
class QueryMap extends Map<string, string> {
  public toString() {
    let str = `?`
    for (const [key, value] of this) {
      const qs = `${key}=${value}`
      str = `${str}${qs}&`
    }
    return str.slice(0, -1)
  }
}
interface Tier<T> {
  _id: string
  name: string
  dragons: T[]
}

type PartialDragon = Partial<Dragon>
// const queryDragons = async (client: ApolloClient<any>, variables: Record<'tier', string>) => {
//       const { data } = await client.query<Tier<PartialDragon>, {tier: string}>({
//         query: ,
//         variables
//       })

//       return data
// }
type Identity<T> = T
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

const findDragons = async (
  client: ApolloClient<any>,
  options: {
    dragon: string
    tier: string
  }
) => {
  const { ...variables } = options
  // type TD = Tier<Dragon>
  const {
    data: { dragons }
  } = await client.query<Pick<Tier<Dragon>, "dragons">, typeof variables>({
    query: FIND_DRAGON_TIER,
    variables
  })

  return dragons
}

const BreedingSearch = () => {
  const [state, { updateParents, updateDragons, updateTier }] = useBreedCtx()

  const client = useApollo()
  const dragonQS = new QueryMap()
  const parentUpdate = React.useCallback(
    (identifer: string, type: "first" | "second") => {
      dragonQS.set(type, identifer)
      switch (type) {
        case "first": {
          return updateParents.first
        }
        case "second": {
          return updateParents.second
        }
      }
    },
    [dragonQS, updateParents.first, updateParents.second]
  )
  const useCallback = <T extends Identity<typeof parentUpdate>>(f: T) =>
    React.useCallback(f, [parentUpdate])
  const getDragons = React.useCallback(
    debounce(
      (dragon: string) =>
        findDragons(client, {
          dragon,
          tier: state.currentTier
        }).then(updateDragons),
      500
    ),
    [client, state.currentTier, updateDragons]
  )
  const updater = {
    first: useCallback((e: string) => parentUpdate(e, "first")),
    second: useCallback((e: string) => parentUpdate(e, "second"))
  }
  // const
  return (
    <>
      <TierMenu setTier={n => updateTier(Number.parseInt(n, 10))} />
      <DragonMenu setParent={updater.first} getDragons={getDragons} />
      <DragonMenu setParent={updater.second} getDragons={getDragons} />
      {dragonQS.has("first") && dragonQS.has("second") && (
        <Button to={`/children${dragonQS}`} component={Link} />
      )}
    </>
  )
}

export default () => <Route path="/breeding" component={BreedingSearch} />

// function combine<T>(...funcs: ((x: T) => void)[]): (x: T) => void {
//     return x => {
//         for (const f of funcs) f(x);
//     }
// }
