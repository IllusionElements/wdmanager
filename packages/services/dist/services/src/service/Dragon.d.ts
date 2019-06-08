/// <reference types="mongoose" />
import { IDragon } from "../db";
import { Rarity } from "../Rarity";
declare class DragonService {
    private db;
    rarity: Map<number, Rarity>;
    static rarity: Map<number, Rarity>;
    constructor();
    findDragon({ identifier }: Pick<IDragon, "identifier">): import("mongoose").DocumentQuery<IDragon | null, IDragon, {}>;
}
export default DragonService;
