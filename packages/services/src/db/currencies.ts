import { model, Schema, Document } from "mongoose"
import { TypeOfSchema } from "./types/TypeOfSchema"

const currencySchema = <const>{
  tier: Number,
  currency: String
}
const CurrencySchema = new Schema(currencySchema)
export interface ICurrency
  extends Document,
    TypeOfSchema<typeof currencySchema> {}
export const Currency = model<ICurrency>("egg_currencies", CurrencySchema)
