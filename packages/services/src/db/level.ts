import { model, Schema, Document } from "mongoose"
import { TypeOfSchema } from "./types/TypeOfSchema"
const base = [
  {
    type: String,
    amount: Number
  }
]
const levelSchema = {
  identifier: String,
  level: Number,
  upgradeCost: base,
  upgradeTimeInSeconds: Number,
  achievementRequirements: String,
  HP: Number,
  fullHealDuration: Number,
  attackType: base,
  abilities: [
    {
      name: String,
      spellType: String
    }
  ],
  attackPower: Number,
  battleUseCost: base,
  forwardSpeed: Number,
  spellRageIdentifier: String,
  requiredStableLevel: Number,
  upgradeXP: Number,
  xpRewardMultiplier: Number,
  upgradeReward: base,
  powerLevel: Number
}

const LevelSchema = new Schema(levelSchema)
export interface ILevel extends Document, TypeOfSchema<typeof levelSchema> {}
export const Levels = model<ILevel>("level", LevelSchema)
