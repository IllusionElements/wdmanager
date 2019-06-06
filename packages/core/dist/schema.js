import { gql } from "apollo-server";
import fs from "fs";
import path from "path";
const srcs = ["./gql/schema/dragon.gql", "./gql/schema/query.gql"];
const typedef = srcs.map(src => {
    const loc = path.join(process.cwd(), "packages/core/dist/gql", src);
    const file = fs.readFileSync(loc, { encoding: "utf-8" });
    return gql(file);
});
export default typedef;
