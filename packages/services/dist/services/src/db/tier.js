import { model, Schema } from "mongoose";
const tierSchema = {
    tier: Number,
    tierName: String
};
const TierSchema = new Schema(tierSchema);
export const Tiers = model("tier", TierSchema);
