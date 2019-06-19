import { gql } from "apollo-server"
import fs from "fs"
import path from "path"
const srcs = ["./gql/schema/dragon.gql", "./gql/schema/query.gql"]
const typedefPromise = srcs.map(async src => {
  const loc = path.join(process.cwd(), "packages/core/dist/", src)
  const file = await fs.promises.readFile(loc, { encoding: "utf-8" })
  return gql(file)
})
console.timeEnd("schema")
export default Promise.all(typedefPromise)
