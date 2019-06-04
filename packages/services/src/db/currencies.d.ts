/// <reference types="mongoose" />
import { MongoCollection } from "./types/IMongoCollection";
import { TypeOfSchema } from "./types/TypeOfSchema";
interface ICurrency extends MongoCollection {
    tier: NumberConstructor;
    currency: StringConstructor;
}
export declare type Currency = TypeOfSchema<ICurrency>;
export declare const Currency: import("mongoose").Model<import("mongoose").Document, {}>;
export {};
