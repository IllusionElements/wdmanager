import { pick } from "@manager/utils"
export const rarity = pick(
  "defaultRarity",
  (rarity, _, { dragons: { service } }) => service.rarity.get(rarity)
)
