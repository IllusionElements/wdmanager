import { Model } from "mongoose"
export const service = (db: () => Model<Document, {}>) => (
  t: any,
  k: string,
  o: PropertyDescriptor
) => {}
