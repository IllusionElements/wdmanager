export default () => {
  const ENV = ".env"
  const env = require("fs")
    .readFileSync(require("path").join("./", ENV), { encoding: "utf-8" })
    .split(/\n/)
  for (const k of env) {
    const [key, val] = k.split("=")
    console.log({ [key]: val })
    process.env[key] = val
  }
  console.log("DONE")
}
