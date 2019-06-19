import mongoose from "mongoose"

declare global {
  namespace VaultJS {
    export interface ProcessEnv extends NodeJS.ProcessEnv {
      MONGO_URL: string
    }
  }
}
const MongooseOptions: Exclude<
  $Value<ArgumentType<typeof mongoose.connect>, 1>,
  undefined
> = {
  useNewUrlParser: true
}
mongoose
  .connect((<VaultJS.ProcessEnv>process.env).MONGO_URL, MongooseOptions)
  .then(mongo => {
    console.log(mongo.connection.config)
  })
