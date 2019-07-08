import { pick } from "@manager/utils"
import { DragonResolver } from "./DragonResolver"
export const dragonClass: DragonResolver<string> = pick("dragonClass")
