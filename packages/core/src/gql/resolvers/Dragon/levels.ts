import { ILevel as Level } from "@manager/services"
import { MongoClient, Db } from "mongodb"
import { DragonResolver } from "./DragonResolver"
const findDragonLevels = async (db: Db, identifier: string) => {
  const collection = db.collection<Level>("levels")
  return collection.find({
    identifier: {
      $eq: identifier
    }
  })
}
export const levels: DragonResolver<Promise<Level[]>> = async ({
  identifier,
  ...dragons
}) => {
  if (dragons.levels) {
    return dragons.levels
  }
  const client = await MongoClient.connect(process.env.MONGO_URL!)
  const db = client.db("war_dragons")
  try {
    const levels = await findDragonLevels(db, identifier)
    return levels.toArray()
  } catch (e) {
    console.error(e)
    return []
  } finally {
    client.close()
  }
}
