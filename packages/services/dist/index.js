import mongoose from "mongoose"
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true
  })
  .then(() => console.log("MONGO: connected!"))

export * from "./db"
export { default as DragonService } from "./Dragon"
export * from "./Tier"
