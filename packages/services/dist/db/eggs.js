import { model, Schema } from "mongoose"

const distSchema = {
  type: String,
  probability: Number
}
const EggSchema = new Schema({
  identifier: Number,
  firstDragonIdentifier: String,
  secondDragonIdentifier: String,
  possibleRawEggDistribution: [distSchema],
  goldPossibleRawEggDistribution: [distSchema],
  eggNumber: Number
})
export const Eggs = model("egg", EggSchema)
