import { main } from "./main"

main()
  .then(() => console.log("server successfully started"))
  .catch(err => {
    console.error(err)
    process.exit(0)
  })
