import { model, Schema } from "mongoose";
const base = [
    {
        type: String,
        amount: Number
    }
];
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
};
const LevelSchema = new Schema(levelSchema);
export const Levels = model("level", LevelSchema);
