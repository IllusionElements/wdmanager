import { service } from "../service"
import { Model, Document } from "mongoose"
import { Dragon } from "../Dragon/"
enum Rarity {
  COMMON = "common",
  RARE = "rare",
  EPIC = "epic",
  LEGENDARY = "legendary",
  MYTHIC = "mythic"
}
@service(() => Dragon)
class DragonService {
  private db!: Model<Document, any>
  public static rarity = <Map<number, Rarity>>(
    new Map(
      [
        Rarity.COMMON,
        Rarity.RARE,
        Rarity.EPIC,
        Rarity.LEGENDARY,
        Rarity.MYTHIC
      ].map(([r, i]) => [i, r])
    )
  )
  public rarity: Map<number, Rarity> = DragonService.rarity
  async getAllTiers() {
    const { db } = this
  }
}
