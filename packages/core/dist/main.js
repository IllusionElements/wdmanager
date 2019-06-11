import express from "express"
import { server } from "./config"

const app = express()
app.get("/", (req, res, next) => {
  console.log(req.body)
  next()
})
server.applyMiddleware({ app, path: "/" })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
