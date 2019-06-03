import mongoose from "mongoose"

mongoose.connect(process.env.MONGO_URL!).then(() => console.log("connected!"))
import("fs").then(fs => fs.promises.read)
