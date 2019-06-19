import { model, Schema } from "mongoose"
const breedSchema = {
  deck: String,
  dragonIdentifier: String,
  distribution: Number,
  breedChance: Number
}
const BreedSchema = new Schema(breedSchema)
export const Breeds = model("breed", BreedSchema)
