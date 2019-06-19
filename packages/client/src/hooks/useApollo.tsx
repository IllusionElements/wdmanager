import React from "react"
import { ApolloProvider as ReactApolloProvider } from "react-apollo"

type ExtractProps<T> = T extends React.Component<infer Props> ? Props : {}
type ApolloProps<T> = ExtractProps<ReactApolloProvider<T>>

const ApolloContext = React.createContext<
  Pick<ApolloProps<unknown>, "client">["client"]
>({} as Pick<ApolloProps<unknown>, "client">["client"])

export const ApolloProvider = <TCache extends any>(
  props: ApolloProps<TCache>
) => (
  <ReactApolloProvider client={props.client}>
    <ApolloContext.Provider value={props.client}>
      {props.children}
    </ApolloContext.Provider>
  </ReactApolloProvider>
)

declare global {
  type Optional<T> = { [K in keyof T]+?: T[K] }
}

export const useApollo = <T extends any>() => {
  const client = (React.useContext(ApolloContext) as unknown) as Pick<
    ApolloProps<T>,
    "client"
  >["client"]

  return { client }
}

export default useApollo
