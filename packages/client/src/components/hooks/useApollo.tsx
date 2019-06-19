import { useContext } from "react"
import { ApolloContext } from "react-apollo"
import { ApolloClient } from "apollo-client"
import { ApolloContextValue } from "react-apollo/ApolloContext"
const formatString = <S extends string>(s: S): S =>
  s.replace(/\n/g, "").replace(/[ ]{2,}/g, " ") as S
const createClient = <T extends ApolloContextValue>(client: T) =>
  client && { client }
export const useApollo = <T extends any = any>(
  overrideClient?: ApolloClient<T>
) => {
  const client = useContext(ApolloContext)
  if (overrideClient) {
    return createClient(overrideClient as ApolloContextValue)
  }
  if (client === undefined) {
    const error = formatString(
      `Could not find "client" in the context or passed in as a prop.
        Wrap the root component in an <ApolloProvider>,
        or pass an ApolloClient instance in via props.`
    )
    throw new Error(error)
  }
  return createClient(client)
}

export default useApollo
