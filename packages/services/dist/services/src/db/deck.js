import { model, Schema } from "mongoose";
const deckSchema = {
    identifier: String,
    possibleOutcomeDistribution: [
        {
            id: String,
            distribution: Number,
            probability: Number
        }
    ]
};
const DeckSchema = new Schema(deckSchema);
export const Decks = model("deck", DeckSchema);
