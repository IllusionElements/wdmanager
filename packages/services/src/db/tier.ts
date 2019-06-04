import { model, Schema } from "mongoose"
import { MongoCollection } from "./types/IMongoCollection"
import { TypeOfSchema } from "./types/TypeOfSchema"
import { IDragon } from "./dragon"
interface ITier extends MongoCollection {
  tier: NumberConstructor
  tierName: StringConstructor
  dragons?: IDragon[]
}
const tierSchema: Omit<ITier, "_id" | "dragons"> = {
  tier: Number,
  tierName: String
}
const TierSchema = new Schema(tierSchema)
export type Tier = TypeOfSchema<ITier>
export const Tiers = model("tier", TierSchema)
