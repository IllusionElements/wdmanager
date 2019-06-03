import { Dragons, Tiers } from "../../services/src/db"
import DragonService from "./../../services/src/Dragon"
import { Model } from "mongoose"

const createContext = <T extends Model<any, any>, U>(db: T, service: U) => ({
  db,
  service
})
const dragons = createContext(Dragons, new DragonService())
export default {}
export type ResolverContext = {
  dragons: {
    db: typeof Dragons
    service: DragonService
  }
}
