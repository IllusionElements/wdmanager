import { gql } from "apollo-server"
import fs from "fs"
import path from "path"
const srcs = ["./gql/schema/dragon.gql", "./gql/schema/query.gql"]
console.time("schema")
const typedef = srcs.map(src => {
  const loc = path.join(process.cwd(), "packages/core/dist/", src)
  const file = fs.readFileSync(loc, { encoding: "utf-8" })
  return gql(file)
})
console.timeEnd("schema")
export default typedef
