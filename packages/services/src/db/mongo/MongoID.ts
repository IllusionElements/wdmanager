import t from "io-ts"
import { ObjectID } from "mongodb"
export class MongoID extends t.Type<ObjectID> {
  static isOID(u: unknown): u is ObjectID {
    if (u instanceof ObjectID) {
      return true
    }
    if ("_id" in <any>u) {
      return typeof (u as any)._id === "object"
    }
    return false
  }
  static validate(
    this: typeof MongoID,
    u: unknown,
    c: t.Context
  ): ReturnType<t.Validate<unknown, ObjectID>> {
    return this.isOID(u) ? t.success(u) : t.failure(u, c)
  }
  constructor() {
    const validate = (...args: [unknown, t.Context]) =>
      MongoID.validate(...args)
    super("Mongo Object ID", MongoID.isOID, validate, t.identity)
  }
}
