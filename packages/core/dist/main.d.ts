interface LoadReturn {
  setup: typeof import("./config").default
  express: typeof import("express")
}

declare const load: () => LoadReturn

export function main(): {
  server: import("apollo-server-express").ApolloServer
  app: ReturnType<LoadReturn["express"]>
}
