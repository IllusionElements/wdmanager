import { MongoClient } from "mongodb"
const findDragonLevels = async (db, identifier) => {
  const collection = db.collection("levels")
  return collection.find({
    identifier: {
      $eq: identifier
    }
  })
}
export const levels = async ({ identifier, ...dragons }) => {
  if (dragons.levels) {
    console.log(dragons.levels)
    return dragons.levels
  }
  const client = await MongoClient.connect(process.env.MONGO_URL)
  const db = client.db("war_dragons")
  try {
    const levels = await findDragonLevels(db, identifier)
    const lvl = await levels.toArray()
    console.log({ levels: lvl })
    return lvl
  } catch (e) {
    console.error(e)
    return []
  } finally {
    client.close()
  }
}
