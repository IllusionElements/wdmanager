import t from "io-ts";
import { ObjectID } from "mongodb";
export class MongoID extends t.Type {
    static isOID(u) {
        if (u instanceof ObjectID) {
            return true;
        }
        if ("_id" in u) {
            return typeof u._id === "object";
        }
        return false;
    }
    static validate(u, c) {
        return this.isOID(u) ? t.success(u) : t.failure(u, c);
    }
    constructor() {
        const validate = (...args) => MongoID.validate(...args);
        super("Mongo Object ID", MongoID.isOID, validate, t.identity);
    }
}
