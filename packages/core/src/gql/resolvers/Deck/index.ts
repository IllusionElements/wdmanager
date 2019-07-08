import { IDragon } from "@manager/services"

export default {
  fragments: (root: { dragon: IDragon }) => root.dragon.numberOfFragmentsNeeded
}
