/// <reference types="mongoose" />
export declare const Dragon: {
    rarity: (dragon: import("../../../../../services/src").IDragon, _: any, ctx: {
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
    }) => Promise<Promise<any>>;
    incubatorLevel: (dragon: import("../../../../../services/src").IDragon, _: any, ctx: {
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
    }) => Promise<Promise<any>>;
    breedableLevel: (dragon: import("../../../../../services/src").IDragon, _: any, ctx: {
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
    }) => Promise<Promise<any>>;
    breedingCaveLevel: (dragon: import("../../../../../services/src").IDragon, _: any, ctx: {
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
    }) => Promise<Promise<any>>;
    isDivine: (dragon: import("../../../../../services/src").IDragon, _: any, ctx: {
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
    }) => Promise<Promise<any>>;
    frags: (dragon: import("../../../../../services/src").IDragon, _: any, ctx: {
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
    }) => Promise<Promise<any>>;
    class: (dragon: import("../../../../../services/src").IDragon, _: any, ctx: {
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
    }) => Promise<Promise<any>>;
    title: (dragon: import("../../../../../services/src").IDragon, _: any, ctx: {
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
    }) => Promise<Promise<any>>;
    defaultIconFileName: (dragon: import("../../../../../services/src").IDragon, _: any, ctx: {
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
    }) => Promise<Promise<any>>;
    levels: (dragon: import("../../../../../services/src").IDragon, _: any, ctx: {
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
    }) => Promise<import("../../../../../services/src").ILevel[]>;
};
