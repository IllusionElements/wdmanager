import { Model, Document } from "mongoose"
export const service = (db: () => Record<string, Model<Document, {}>>) => <
  T extends new (...args: any[]) => any
>(
  ServiceModel: T
) => {
  return class Service extends ServiceModel {
    //@ts-ignore
    public db = db()
  }
}
