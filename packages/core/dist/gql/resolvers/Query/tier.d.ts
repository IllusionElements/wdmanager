/// <reference types="mongoose" />
export declare const tier: (
  _: any,
  key: string,
  ctx: {
    readonly dragons: {
      readonly db: import("mongoose").Model<
        import("../../../../../services/src").IDragon,
        {}
      >
      readonly service: import("../../../../../services/src/service/Dragon").default
    }
    readonly tiers: {
      readonly db: import("mongoose").Model<
        import("../../../../../services/src").ITier,
        {}
      >
      readonly service: import("../../../../../services/src").TierService
    }
    readonly eggs: {
      readonly db: import("mongoose").Model<
        import("../../../../../services/src").IEggs,
        {}
      >
      readonly service: import("../../../../../services/src").EggService
    }
    readonly decks: {
      readonly db: import("mongoose").Model<
        import("../../../../../services/src").Deck,
        {}
      >
      readonly service: {}
    }
  }
) => Promise<import("../../../../../services/src").ITier[]>
export type BatchLoadFn<K, V> = (
  keys: ReadonlyArray<K>
) => Promise<ReadonlyArray<V | Error>>
export class CacheLoader<K = string, V = any> {
  private cache: Map<K, V>
  private loaderFunc: BatchLoadFn<K, V>
  load(key: K): Promise<V | Error>
}
