import { gql } from "apollo-server-express"
import fs from "fs"
import path from "path"
const srcs = fs.readdirSync(
  path.join(process.cwd(), "packages/core/dist/gql/schema")
)
console.log(srcs)
const typeDefs = srcs.map(src => {
  const loc = path.join(process.cwd(), "packages/core/dist/gql/schema", src)

  const file = fs.readFileSync(loc, { encoding: "utf-8" })
  return gql(file)
})

export default typeDefs
