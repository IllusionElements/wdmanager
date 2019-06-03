import { model, Schema } from "mongoose"
import { MongoCollection } from "./types/IMongoCollection"
import { TypeOfSchema } from "./types/TypeOfSchema"
interface ICurrency extends MongoCollection {
  tier: NumberConstructor
  currency: StringConstructor
}
const currencySchema: Omit<ICurrency, "_id"> = {
  tier: Number,
  currency: String
}
const CurrencySchema = new Schema(currencySchema)
export type Currency = TypeOfSchema<ICurrency>
export const Currency = model("egg_currencies", CurrencySchema)
