import {
  Dragons,
  Tiers,
  Eggs,
  DragonService,
  TierService,
  EggService,
  Decks
} from "@manager/services"
import { Model } from "mongoose"

type Context<
  DB extends Model<any, any>,
  Service extends new (...args: any[]) => any
> = {
  db: DB
  service: Service extends new (...args: any[]) => infer R ? R : Service
}
const createContext = <
  T extends Model<any, any>,
  U extends new (...args: any[]) => any
>(
  db: T,
  Service: U
) =>
  ({
    db,
    service: new Service() as Context<T, U>["service"]
  } as const)
const dragons = createContext(Dragons, DragonService)
const tiers = createContext(Tiers, TierService)
const eggs = createContext(Eggs, EggService)
const decks = createContext(Decks, class DeckService {})
const context = <const>{
  dragons,
  tiers,
  eggs,
  decks
}

export type ResolverContext = typeof context

export default context
