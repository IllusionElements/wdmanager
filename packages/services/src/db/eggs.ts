import t from "io-ts"
import { model, Schema } from "mongoose"
import { oid } from "./mongo/oid"

const distributionType = t.array(
  t.type({
    type: t.string,
    probability: t.number
  })
)
const EggType = t.type({
  _id: oid,
  identifier: t.Int,
  firstDragonIdentifier: t.string,
  secondDragonIdentifier: t.string,
  possibleRawEggDistribution: distributionType,
  goldPossibleRawEggDistribution: distributionType,
  eggNumber: t.Int
})

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
export type IEgg = t.TypeOf<typeof EggType>
