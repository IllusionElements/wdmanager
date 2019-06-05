export declare enum Rarity {
    COMMON = "common",
    RARE = "rare",
    EPIC = "epic",
    LEGENDARY = "legendary",
    MYTHIC = "mythic"
}
declare type Entry<T, U> = [T, U][];
export declare const Rarities: Entry<number, Rarity>;
export {};
