import React from "react"
import { NameProvider } from "../hooks/useName"
import { ApolloProvider } from "../hooks/useApollo"
import { VaultProps } from "./VaultProps"
const AppProviders = <T extends any>(
  props: Pick<VaultProps<T>, "client" | "children" | "name">
) => (
  <ApolloProvider client={props.client}>
    <NameProvider name={props.name}>{props.children}</NameProvider>
  </ApolloProvider>
)

export default class VaultProviders<T> extends React.PureComponent<
  Pick<VaultProps<T>, "client" | "children" | "name">
> {
  render() {
    const { client, children, name } = this.props
    return (
      <AppProviders client={client} name={name}>
        {children}
      </AppProviders>
    )
  }
}
