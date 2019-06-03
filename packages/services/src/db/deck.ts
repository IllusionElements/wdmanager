import { model, Schema } from "mongoose"
import { MongoCollection } from "./types/IMongoCollection"
import { TypeOfSchema } from "./types/TypeOfSchema"
interface IDeck extends MongoCollection {}
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
export type Deck = IDeck & TypeOfSchema<typeof deckSchema>

export const Decks = model("deck", DeckSchema)
