import { Rarity } from "./Rarity";
declare class DragonService {
    private db;
    rarity: Map<number, Rarity>;
    static rarity: Map<number, Rarity>;
    constructor();
}
export default DragonService;
