import { pick } from "@manager/utils"
import { DragonResolver } from "./DragonResolver"
export const frags: DragonResolver<number> = pick(
  "numberOfFragmentsNeeded",
  Number
)
