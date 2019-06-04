import t from "io-ts";
import { ObjectID } from "mongodb";
export declare class MongoID extends t.Type<ObjectID> {
    static isOID(u: unknown): u is ObjectID;
    static validate(this: typeof MongoID, u: unknown, c: t.Context): ReturnType<t.Validate<unknown, ObjectID>>;
    constructor();
}
