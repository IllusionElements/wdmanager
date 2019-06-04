import { Dragons, Tiers, DragonService, TierService } from "@manager/services"
import { Model } from "mongoose"
declare const _default: {
  dragons: {
    db: Model<import("mongoose").Document, {}>
    service: DragonService
  }
  tiers: {
    db: Model<import("mongoose").Document, {}>
    service: TierService
  }
}
export default _default
export declare type ResolverContext = {
  dragons: {
    db: typeof Dragons
    service: DragonService
  }
  tiers: {
    db: typeof Tiers
    service: TierService
  }
}
