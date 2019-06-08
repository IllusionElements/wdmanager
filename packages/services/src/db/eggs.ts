import { TypeOfSchema } from "./types/TypeOfSchema"
import { model, Schema, Document } from "mongoose"

const eggSchema = {
  identifier: Number,
  firstDragonIdentifier: String,
  secondDragonIdentifier: String,
  deck: String,
  eggNumber: Number
}

const EggSchema = new Schema(eggSchema)

export interface IEggs extends TypeOfSchema<typeof eggSchema>, Document {}
export const Eggs = model<IEggs>("egg", EggSchema)
Eggs.find().exec()
