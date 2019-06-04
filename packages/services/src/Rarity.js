export var Rarity;
(function (Rarity) {
    Rarity["COMMON"] = "common";
    Rarity["RARE"] = "rare";
    Rarity["EPIC"] = "epic";
    Rarity["LEGENDARY"] = "legendary";
    Rarity["MYTHIC"] = "mythic";
})(Rarity || (Rarity = {}));
export const Rarities = [
    Rarity.COMMON,
    Rarity.RARE,
    Rarity.EPIC,
    Rarity.LEGENDARY,
    Rarity.MYTHIC
].map((r, i) => [i, r]);
