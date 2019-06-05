import { model, Schema, Document } from "mongoose"
import { TypeOfSchema } from "./types/TypeOfSchema"
import { IDragon } from "./dragon"
export interface ITier extends Document {
  tier: NumberConstructor
  tierName: StringConstructor
  dragons?: IDragon[]
}
export type Tier = TypeOfSchema<ITier>

const tierSchema: Pick<ITier, "tierName" | "tier"> = {
  tier: Number,
  tierName: String
}
const TierSchema = new Schema(tierSchema)
export const Tiers = model<ITier>("tier", TierSchema)
