/// <reference types="mongoose" />
import { MongoCollection } from "./types/IMongoCollection";
import { TypeOfSchema } from "./types/TypeOfSchema";
import { IDragon } from "./dragon";
interface ITier extends MongoCollection {
    tier: NumberConstructor;
    tierName: StringConstructor;
    dragons?: IDragon[];
}
export declare type Tier = TypeOfSchema<ITier>;
export declare const Tiers: import("mongoose").Model<import("mongoose").Document, {}>;
export {};
