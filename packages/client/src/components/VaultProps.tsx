import React from "react"
import { ApolloClient } from "apollo-client"
export interface VaultProps<T> {
  name: string
  client: ApolloClient<T>
  path?: string
  children?: React.ReactNode
}

export type Props<T> = VaultProps<T>
