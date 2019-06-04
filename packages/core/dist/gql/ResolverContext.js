import { Dragons, Tiers, DragonService, TierService } from "@manager/services"
const createContext = (db, service) => ({
  db,
  service
})
const dragons = createContext(Dragons, new DragonService())
const tiers = createContext(Tiers, new TierService())
export default {
  dragons,
  tiers
}
