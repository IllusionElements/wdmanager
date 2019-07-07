import React from "react"
import { ApolloProvider as ReactApolloProvider } from "react-apollo"
import { ApolloClient } from "apollo-client"

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

export const useApollo = <ApolloCache extends any = any>(
  _client?: ApolloClient<ApolloCache>
) => {
  const client = React.useContext(ApolloContext)
  if (_client) {
    return _client
  }
  return client
}

export default useApollo
