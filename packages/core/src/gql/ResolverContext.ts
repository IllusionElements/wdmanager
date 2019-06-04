import { Dragons, Tiers, DragonService, TierService } from "@manager/services"
import { Model } from "mongoose"

const createContext = <T extends Model<any, any>, U>(db: T, service: U) => ({
  db,
  service
})
const dragons = createContext(Dragons, new DragonService())
const tiers = createContext(Tiers, new TierService())
export default {
  dragons,
  tiers
}
export type ResolverContext = {
  dragons: {
    db: typeof Dragons
    service: DragonService
  }
  tiers: {
    db: typeof Tiers
    service: TierService
  }
}
