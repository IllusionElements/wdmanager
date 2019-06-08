import { TypeOfSchema } from "./types/TypeOfSchema";
import { Document } from "mongoose";
declare const eggSchema: {
    identifier: NumberConstructor;
    firstDragonIdentifier: StringConstructor;
    secondDragonIdentifier: StringConstructor;
    deck: StringConstructor;
    eggNumber: NumberConstructor;
};
export interface IEggs extends TypeOfSchema<typeof eggSchema>, Document {
}
export declare const Eggs: import("mongoose").Model<IEggs, {}>;
export {};
