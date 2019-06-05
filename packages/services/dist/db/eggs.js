import { model, Schema } from "mongoose";
const distSchema = {
    type: String,
    probability: Number
};
const eggSchema = {
    identifier: Number,
    firstDragonIdentifier: String,
    secondDragonIdentifier: String,
    possibleRawEggDistribution: [distSchema],
    goldPossibleRawEggDistribution: [distSchema],
    eggNumber: Number
};
const EggSchema = new Schema(eggSchema);
export const Eggs = model("egg", EggSchema);
