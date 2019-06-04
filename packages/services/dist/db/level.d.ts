/// <reference types="mongoose" />
import { MongoCollection } from "./types/IMongoCollection";
import { TypeOfSchema } from "./types/TypeOfSchema";
interface ILevel extends MongoCollection {
}
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
export declare type Level = ILevel & TypeOfSchema<typeof levelSchema>;
export declare const Levels: import("mongoose").Model<import("mongoose").Document, {}>;
export {};
