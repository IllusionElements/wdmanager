import { pick } from "@manager/utils"
import { DragonResolver } from "./DragonResolver"
export const title: DragonResolver<string> = pick("dragonType")
