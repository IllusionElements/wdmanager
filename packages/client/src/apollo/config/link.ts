import { HttpLink } from "apollo-link-http"
const uri = process.env.GRAPHQL_URI || "http://localhost:4000"
export default new HttpLink({ uri })
console.log(uri)
