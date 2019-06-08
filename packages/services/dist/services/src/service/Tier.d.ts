import { ITier } from "../db/tier";
import { IDragon } from "../db/dragon";
export declare class TierService {
    private db;
    getAllTiers(): Promise<(IDragon & ITier)[]>;
}
