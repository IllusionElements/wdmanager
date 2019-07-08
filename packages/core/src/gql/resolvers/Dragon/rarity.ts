import { IDragon } from "@manager/services"
import { pick } from "@manager/utils"
import { ResolverContext } from "../ResolverContext"
import { DragonResolver } from "./DragonResolver"
export const rarity: DragonResolver<string> = pick(
  "defaultRarity",
  (
    rarity: IDragon["defaultRarity"],
    _: any,
    { dragons: { service } }: ResolverContext
  ) => service.rarity.get(rarity)!
)
