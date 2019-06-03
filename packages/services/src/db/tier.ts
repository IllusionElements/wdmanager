import { model, Schema } from "mongoose"
import { MongoCollection } from "./types/IMongoCollection"
import { TypeOfSchema } from "./types/TypeOfSchema"
interface ITier extends MongoCollection {
  tier: NumberConstructor
  tierName: StringConstructor
}
const tierSchema: Omit<ITier, "_id"> = {
  tier: Number,
  tierName: String
}
const TierSchema = new Schema(tierSchema)
export type Tier = TypeOfSchema<ITier>
export const Tiers = model("tier", TierSchema)
