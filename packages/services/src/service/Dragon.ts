import { service } from "../service"
import { Dragons, Tiers, IDragon } from "../db"
import { Rarity, Rarities } from "../Rarity"

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

  public findDragon({ identifier }: Pick<IDragon, "identifier">) {
    return this.db.Dragons.findOne({
      identifier
    })
  }
}

export default DragonService
