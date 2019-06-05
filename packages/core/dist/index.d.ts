import { ApolloServer } from "apollo-server";
declare global {
    type ArgumentType<T extends (...args: any[]) => any> = T extends (...args: infer U) => any ? U : any[];
}
export declare const server: ApolloServer;
