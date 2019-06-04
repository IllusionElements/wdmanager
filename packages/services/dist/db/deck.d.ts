/// <reference types="mongoose" />
import { MongoCollection } from "./types/IMongoCollection";
import { TypeOfSchema } from "./types/TypeOfSchema";
interface IDeck extends MongoCollection {
}
declare const deckSchema: {
    identifier: StringConstructor;
    possibleOutcomeDistribution: {
        id: StringConstructor;
        distribution: NumberConstructor;
        probability: NumberConstructor;
    }[];
};
export declare type Deck = IDeck & TypeOfSchema<typeof deckSchema>;
export declare const Decks: import("mongoose").Model<import("mongoose").Document, {}>;
export {};
