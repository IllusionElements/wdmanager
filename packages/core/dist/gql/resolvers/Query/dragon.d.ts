/// <reference types="mongoose" />
export declare const dragon: (_: any, drag: string, { dragons: { db } }: {
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
}) => Promise<import("../../../../../services/src").IDragon[]>;
