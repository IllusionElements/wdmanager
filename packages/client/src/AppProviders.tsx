import React from "react"
import client from "./apollo/client"
import { CloudinaryProvider } from "./hooks/useCloudinary"
import { ApolloProvider } from "./hooks/useApollo"
import { BreedProvider } from "containers/Breeding/Context"
export const AppProviders: React.FC = ({ children }) => (
  <ApolloProvider client={client}>
    <BreedProvider>
      <CloudinaryProvider cloudName="dl55xp184">{children}</CloudinaryProvider>
    </BreedProvider>
  </ApolloProvider>
)
