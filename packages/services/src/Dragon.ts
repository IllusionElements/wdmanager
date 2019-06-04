import { service } from "./service"
import { Dragons, Tiers } from "./db/index"
import { Rarity, Rarities } from "./Rarity"

@service(() => ({
  Dragons,
  Tiers
}))
class DragonService {
  private db!: {
    Dragons: typeof Dragons
    Tiers: typeof Tiers
  }
  public rarity = DragonService.rarity
  public static rarity: Map<number, Rarity> = new Map(Rarities)
  constructor() {
    console.log(this.db)
  }
}

export default DragonService
