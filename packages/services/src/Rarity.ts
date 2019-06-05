export enum Rarity {
  COMMON = "common",
  RARE = "rare",
  EPIC = "epic",
  LEGENDARY = "legendary",
  MYTHIC = "mythic"
}
type Entry<T, U> = [T, U][]
export const Rarities: Entry<number, Rarity> = [
  Rarity.COMMON,
  Rarity.RARE,
  Rarity.EPIC,
  Rarity.LEGENDARY,
  Rarity.MYTHIC
].map((r, i) => [i, r])
