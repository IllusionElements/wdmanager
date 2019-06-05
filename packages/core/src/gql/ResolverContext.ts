import {
  Dragons,
  Tiers,
  Eggs,
  DragonService,
  TierService,
  EggService
} from "@manager/services"
import { Model } from "mongoose"

const createContext = <
  T extends Model<any, any>,
  U extends new (...args: any[]) => any
>(
  db: T,
  Service: U
): {
  db: T
  service: U extends new (...args: any[]) => infer R ? R : U
} => ({
  db,
  service: new Service()
})
const dragons = createContext(Dragons, DragonService)
const tiers = createContext(Tiers, TierService)
const eggs = createContext(Eggs, EggService)
export default {
  dragons,
  tiers,
  eggs
}

export interface ResolverContext {
  dragons: typeof dragons
  tiers: typeof tiers
  eggs: typeof eggs
}
