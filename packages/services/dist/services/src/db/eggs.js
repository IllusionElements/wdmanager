import { model, Schema } from "mongoose";
const eggSchema = {
    identifier: Number,
    firstDragonIdentifier: String,
    secondDragonIdentifier: String,
    deck: String,
    eggNumber: Number
};
const EggSchema = new Schema(eggSchema);
export const Eggs = model("egg", EggSchema);
Eggs.find().exec();
