import { ApolloError } from "apollo-client"
import React from "react"
import { Query } from "react-apollo"
import { DragonQuery } from "./dragon"
import { GET_DRAGONS } from "./getDragons"

type RenderPropArgumentType<
  T extends React.Component
> = T extends React.Component<{
  children: Functor<React.ReactNode, infer Args>
}>
  ? Args
  : any[]
type Unpack<T> = T extends Array<infer U> ? U : T
type DragonQueryArgs = RenderPropArgumentType<DragonQuery>
type QueryResultType<T> = T extends Query<infer R, any> ? R : never
type DragonData = { data: QueryResultType<DragonQuery> }
const Loading = () => <div />
const DataError = (props: { error?: ApolloError }) => <>{props.error}</>
const renderDragons = (data: Unpack<DragonQueryArgs>) => {
  if (data.loading) {
    return <Loading />
  } else if (data.error) {
    return <DataError error={data.error} />
  }
  const { data: dragons } = data as DragonData

  return (
    <>
      {dragons.map((dragon, i, drags) => (
        <React.Fragment key={dragon.identifier}>
          <p className={dragon.identifier}>{dragon.name}</p>
          <p>{drags[i].name}</p>
        </React.Fragment>
      ))}
    </>
  )
}
const Landing = () => {
  return <DragonQuery query={GET_DRAGONS}>{renderDragons}</DragonQuery>
}
export default Landing
