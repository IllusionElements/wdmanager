/// <reference types="mongoose" />
import { IDragon } from "@manager/services";
export declare const findAllDragons: (_root: any, _: any, context: {
    readonly dragons: {
        readonly db: import("mongoose").Model<IDragon, {}>;
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
}) => Promise<IDragon[]>;
