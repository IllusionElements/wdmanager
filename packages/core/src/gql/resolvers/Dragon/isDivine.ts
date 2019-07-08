import { pick } from "@manager/utils"
import { DragonResolver } from "./DragonResolver"
export const isDivine: DragonResolver<boolean> = pick("isEvolveDragon", Boolean)
