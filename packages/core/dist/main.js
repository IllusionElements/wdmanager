const load = async () => {
  const [{ default: setup }, { default: express }] = await Promise.all([
    import("./config"),
    import("express")
  ])
  return {
    setup,
    express
  }
}
export async function main() {
  const { setup, express } = await load()
  const server = await setup()
  const app = express()
  app.get("/", (req, res, next) => {
    console.log({ req })
    next()
  })
  server.applyMiddleware({ app, path: "/" })
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  )

  return {
    server,
    app
  }
}
