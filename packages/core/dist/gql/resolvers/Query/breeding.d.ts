/// <reference types="mongoose" />
declare type Parent = {
    first: string;
    second: string;
};
export declare const dragonChildren: (_: any, args: Parent | {
    parents: Parent;
}, { eggs: { service: eggService } }: {
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
}) => Promise<import("../../../../../services/src").IEggs[]>;
export declare const dragonParents: (_: any, { child }: {
    child: string;
}, { eggs }: {
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
}) => Promise<{
    dragonName: string;
    id: string;
    parents: import("../../../../../services/src").Result[];
}>;
export {};
