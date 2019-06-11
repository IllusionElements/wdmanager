import { Document } from "mongoose";
import { TypeOfSchema } from "./types/TypeOfSchema";
declare const levelSchema: {
    identifier: StringConstructor;
    level: NumberConstructor;
    upgradeCost: {
        type: StringConstructor;
        amount: NumberConstructor;
    }[];
    upgradeTimeInSeconds: NumberConstructor;
    achievementRequirements: StringConstructor;
    HP: NumberConstructor;
    fullHealDuration: NumberConstructor;
    attackType: {
        type: StringConstructor;
        amount: NumberConstructor;
    }[];
    abilities: {
        name: StringConstructor;
        spellType: StringConstructor;
    }[];
    attackPower: NumberConstructor;
    battleUseCost: {
        type: StringConstructor;
        amount: NumberConstructor;
    }[];
    forwardSpeed: NumberConstructor;
    spellRageIdentifier: StringConstructor;
    requiredStableLevel: NumberConstructor;
    upgradeXP: NumberConstructor;
    xpRewardMultiplier: NumberConstructor;
    upgradeReward: {
        type: StringConstructor;
        amount: NumberConstructor;
    }[];
    powerLevel: NumberConstructor;
};
export interface ILevel extends Document, TypeOfSchema<typeof levelSchema> {
}
export declare const Levels: import("mongoose").Model<ILevel, {}>;
export {};
