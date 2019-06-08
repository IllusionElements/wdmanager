import { model, Schema } from "mongoose";
const currencySchema = {
    tier: Number,
    currency: String
};
const CurrencySchema = new Schema(currencySchema);
export const Currency = model("egg_currencies", CurrencySchema);
