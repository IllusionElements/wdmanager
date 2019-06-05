interface Identifier {
    id: string;
    name: string;
}
declare type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
export interface Result extends Omit<Identifier, "name"> {
    _id: string;
    identifier: string;
    parents: {
        _id: string;
        firstDragonIdentifier: Identifier;
        secondDragonIdentifier: Identifier;
    };
}
export declare class EggService {
    private db;
    private static createMatch;
    findChildren(parents: {
        first: string;
        second: string;
    }): Promise<any>;
    findParents(opts: {
        child: string;
    }): Promise<{
        dragonName: string;
        id: string;
        parents: Result[];
    }>;
}
export {};
