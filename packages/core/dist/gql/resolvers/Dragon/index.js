export { rarity } from "./rarity"
export { incubatorLevel } from "./incubatorLevel"
export { breedableLevel } from "./breedableLevel"
export { breedingCaveLevel } from "./breedingCaveLevel"
export { isDivine } from "./isDivine"
export { frags } from "./frags"
export { dragonClass } from "./dragonClass"
export { title } from "./title"
export { defaultIconFileName } from "./defaultIconFileName"
export { levels } from "./levels"
export { default as parents } from "./parents"
export { default as children } from "./children"
export const incubatingTime = (
  { _doc: { incubatingTime, ...rest } },
  ...args
) => {
  return incubatingTime
}

export const identifier = root => {
  // console.log(root)
  return root.identifier
}

export const tier = (root, _, ctx) =>
  ctx.tiers.db.findOne({
    tier: root.defaultTierNumber
  })
export const element = ({ elementIdentifier }) => elementIdentifier
