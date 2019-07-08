/// <reference path="../../../../../../src/gql/resolvers/Query/utils.d.ts" />
/// <reference types="mongoose" />
/**
 * Each item in this object maps to a graphQL query request
 * the methods are used to resolve the fields specified in the graphql schema
 * Each function is lazyLoaded on demand
 */
declare const Query: {
    dragonChildren: (_: any, args: {
        first: string;
        second: string;
    } | {
        parents: {
            first: string;
            second: string;
        };
    }, __2: {
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
    dragonParents: (_: any, __1: {
        child: string;
    }, __2: {
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
    tiers: (_root: import("../../../../../services/src").IDragon, _: any, context: {
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
    }) => Promise<(import("../../../../../services/src").IDragon & import("../../../../../services/src").ITier)[]>;
    dragons: (_root: any, _: any, context: {
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
    tier: (_: any, key: string, ctx: {
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
    }) => Promise<import("../../../../../services/src").ITier[]>;
    dragon: (_: any, drag: string, __2: {
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
};
export default Query;
