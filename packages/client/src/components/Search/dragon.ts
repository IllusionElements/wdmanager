import { Query } from "react-apollo"

interface DragonQueryResult {
  _id:
    | string
    | {
        $oid: string
      }
  identifier: string
  name: string
}

type DragonQueryResults = DragonQueryResult[]

export class DragonQuery extends Query<DragonQueryResults> {}
