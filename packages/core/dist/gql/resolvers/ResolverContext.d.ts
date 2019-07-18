import { DragonService, TierService, EggService } from "@manager/services"
import { Model } from "mongoose"
declare const context: {
  readonly dragons: {
    readonly db: Model<import("../../../../services/src").IDragon, {}>
    readonly service: DragonService
  }
  readonly tiers: {
    readonly db: Model<import("../../../../services/src").ITier, {}>
    readonly service: TierService
  }
  readonly eggs: {
    readonly db: Model<import("../../../../services/src").IEggs, {}>
    readonly service: EggService
  }
  readonly deck: {
    readonly db: Model<import("../../../../services/src").Deck, {}>
    readonly service: {}
  }
}
export declare type ResolverContext = typeof context
export default context
