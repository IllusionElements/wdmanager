/// <reference types="mongoose" />
import t from "io-ts";
declare const EggType: t.TypeC<{
    _id: import("./mongo/MongoID").MongoID;
    identifier: t.BrandC<t.NumberC, t.IntBrand>;
    firstDragonIdentifier: t.StringC;
    secondDragonIdentifier: t.StringC;
    possibleRawEggDistribution: t.ArrayC<t.TypeC<{
        type: t.StringC;
        probability: t.NumberC;
    }>>;
    goldPossibleRawEggDistribution: t.ArrayC<t.TypeC<{
        type: t.StringC;
        probability: t.NumberC;
    }>>;
    eggNumber: t.BrandC<t.NumberC, t.IntBrand>;
}>;
export declare const Eggs: import("mongoose").Model<import("mongoose").Document, {}>;
export declare type IEgg = t.TypeOf<typeof EggType>;
export {};
