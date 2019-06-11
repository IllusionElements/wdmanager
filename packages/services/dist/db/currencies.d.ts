import { Document } from "mongoose";
import { TypeOfSchema } from "./types/TypeOfSchema";
declare const currencySchema: {
    readonly tier: NumberConstructor;
    readonly currency: StringConstructor;
};
export interface ICurrency extends Document, TypeOfSchema<typeof currencySchema> {
}
export declare const Currency: import("mongoose").Model<ICurrency, {}>;
export {};
