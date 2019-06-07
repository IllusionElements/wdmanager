import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
import { Query, Dragon } from "./gql/resolvers";
import * as Tier from "./gql/resolvers/Tier";
import typeDefs from "./schema";
dotenv.config({
    debug: true
});
export const server = new ApolloServer({
    typeDefs,
    context: async () => {
        const { default: ctx } = await import("./gql/resolvers/ResolverContext");
        const secrets = new Map().set("MONGO_URL", process.env.MONGO_URL);
        return { ...ctx, secrets };
    },
    resolvers: {
        Query,
        Dragon,
        Tier
    }
});
