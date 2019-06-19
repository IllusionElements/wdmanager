import { ApolloServer } from "apollo-server"

declare const setup: () => Promise<ApolloServer>
export default setup
