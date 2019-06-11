import fs, { promises as fsPromise } from "fs"
import path from "path"
import parse from "./parse"
import config from "./config"

config()
const DIR = "lib"
const keys = parse(process.argv)
const ext = keys.get("extension") as string
const mainFile = path.join(process.cwd(), DIR, keys.get("main")!)
const output = path.join(mainFile, keys.get("output")!)
const matcher = new RegExp((<string>process.env.MATCH).concat(ext), "i")
const copy = async (
  src: fs.PathLike,
  dest: fs.PathLike,
  flags?: number | undefined
): Promise<void> => {
  try {
    await fsPromise.copyFile(src, dest, flags)
  } catch (e) {
    await fsPromise.appendFile(
      "./error",
      `${e.message}
    `
    )
  }
}

for (const file of fs.readdirSync(mainFile)) {
  if (file.match(matcher)) {
    const src = path.join(mainFile, file)
    const out = path.join(output, file)
    fsPromise.copyFile(src, out, fs.constants.COPYFILE_EXCL).catch(e =>
      fsPromise.appendFile(
        "./error",
        `${e.message}
      `
      )
    )
  }
}
