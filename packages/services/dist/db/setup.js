import mongoose from "mongoose"
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true
  })
  .then(mongo => {
    console.log(mongo.connection.config)
  })
