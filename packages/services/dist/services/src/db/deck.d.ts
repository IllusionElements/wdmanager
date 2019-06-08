import { Document } from "mongoose";
import { TypeOfSchema } from "./types/TypeOfSchema";
declare const deckSchema: {
    identifier: StringConstructor;
    possibleOutcomeDistribution: {
        id: StringConstructor;
        distribution: NumberConstructor;
        probability: NumberConstructor;
    }[];
};
export interface Deck extends Document, TypeOfSchema<typeof deckSchema> {
}
export declare const Decks: import("mongoose").Model<Deck, {}>;
export {};
