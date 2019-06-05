import { Document } from "mongoose";
import { TypeOfSchema } from "./types/TypeOfSchema";
import { IDragon } from "./dragon";
export interface ITier extends Document {
    tier: NumberConstructor;
    tierName: StringConstructor;
    dragons?: IDragon[];
}
export declare type Tier = TypeOfSchema<ITier>;
export declare const Tiers: import("mongoose").Model<ITier, {}>;
