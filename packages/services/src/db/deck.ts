import { model, Schema, Document } from "mongoose"
import { TypeOfSchema } from "./types/TypeOfSchema"
const deckSchema = {
  identifier: String,
  possibleOutcomeDistribution: [
    {
      id: String,
      distribution: Number,
      probability: Number
    }
  ]
}
const DeckSchema = new Schema(deckSchema)
export interface Deck extends Document, TypeOfSchema<typeof deckSchema> {}

export const Decks = model<Deck>("deck", DeckSchema)
