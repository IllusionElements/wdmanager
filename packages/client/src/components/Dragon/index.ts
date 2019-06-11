type Level = {}
enum Rarity {
  COMMON,
  RARE,
  EPIC,
  LEGENDARY,
  MYTHIC
}
interface IDragon {
  _id: ID
  identifier: string
  displayName: string
  class: string
  title: string
  rarity: Rarity
  element: string
  displayDescription: string
  defaultIconFilename: string
  minRange: Int
  attackStartVal: Int
  isAttainable: boolean
  breedableLevel: Int
  breedingCaveLevel: Int
  incubatingTime: Int
  incubatorLevel: Int
  canUpgrade: boolean
  frags: Int
  isDivine: boolean
  isUnbreedableDragon: boolean
  levels: [Level]
}

export type DragonData = $Partial<
  IDragon,
  "_id" | "identifier" | "displayName" | "class"
>
const a = {
  a: String,
  b: Boolean
}
type Z = TypeOf<typeof a>
