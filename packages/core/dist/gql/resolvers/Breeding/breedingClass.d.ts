import { IEggs } from "@manager/services";
import { ResolverContext } from "../ResolverContext";
declare global {
    interface ObjectConstructor {
        keys<T extends object>(o: T): Array<keyof T>;
    }
}
export default class Breeding {
    id: (root: IEggs) => string;
    children(root: IEggs, _: any, context: ResolverContext): Promise<any>;
    parents(root: IEggs, _: any, context: ResolverContext): Promise<{
        id: string;
        first: import("../../../../../services/src").IDragon | null;
        second: import("../../../../../services/src").IDragon | null;
    }>;
    eggNumber(root: IEggs, _: any, _context: ResolverContext): number;
}
