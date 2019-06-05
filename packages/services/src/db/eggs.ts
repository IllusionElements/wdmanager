import { TypeOfSchema } from "./types/TypeOfSchema"
import { model, Schema, Document } from "mongoose"

const distSchema = {
  type: String,
  probability: Number
}
const eggSchema = {
  identifier: Number,
  firstDragonIdentifier: String,
  secondDragonIdentifier: String,
  possibleRawEggDistribution: [distSchema],
  goldPossibleRawEggDistribution: [distSchema],
  eggNumber: Number
}

const EggSchema = new Schema(eggSchema)

export interface IEggs extends TypeOfSchema<typeof eggSchema>, Document {}
export const Eggs = model<IEggs>("egg", EggSchema)
