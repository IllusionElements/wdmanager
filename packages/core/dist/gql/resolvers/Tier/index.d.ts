/// <reference types="mongoose" />
import { Tier } from "@manager/services";
import { ResolverContext } from "../ResolverContext";
export declare const name: (tier: Tier, _: {}, context: ResolverContext) => string;
export declare const dragons: (tier: import("../../../../../services/src/db/types/TypeOfSchema").TypeOfSchema<import("../../../../../services/src").ITier>, _: {}, context: {
    readonly dragons: {
        readonly db: import("mongoose").Model<import("../../../../../services/src").IDragon, {}>;
        readonly service: import("../../../../../services/src/service/Dragon").default;
    };
    readonly tiers: {
        readonly db: import("mongoose").Model<import("../../../../../services/src").ITier, {}>;
        readonly service: import("../../../../../services/src").TierService;
    };
    readonly eggs: {
        readonly db: import("mongoose").Model<import("../../../../../services/src").IEggs, {}>;
        readonly service: import("../../../../../services/src").EggService;
    };
    readonly decks: {
        readonly db: import("mongoose").Model<import("../../../../../services/src").Deck, {}>;
        readonly service: {};
    };
}) => unknown;
