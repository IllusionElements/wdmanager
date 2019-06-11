import path from "path"
import chalk from "chalk"
const isNumber = n => {
  const type = typeof n
  switch (type) {
    case "string": {
      const num = Number.parseFloat(n)
      if (Object.is(NaN, num)) {
        return n
      }
      return num
    }
    default:
      return n
  }
}
const validKeys = [
  "battleUseCost",
  "attackType",
  "upgradeReward",
  "upgradeCost"
]
class CSVParser {
  constructor(fileList) {
    this.fileList = fileList
    this.dir = path.join(process.cwd(), "lib", "data")
  }
  static singleParser(file) {
    return new CSVParser([file])
  }
  async parse(out) {
    const dest$ = path.join(this.dir, out)
    const {
      promises: { readFile, writeFile, appendFile }
    } = await import("fs")
    const files = this.fileList.map(async file => {
      const src = path.join(process.cwd(), "lib/data", file)
      console.log(src)
      const csv = await readFile(src)
      return this.convert(csv, { type: "JSON" })
    })
    const list = await Promise.all(files)
    const write = async (dest, data) => {
      try {
        await writeFile(dest, data)
        console.log(chalk.green("SUCCESS:"), dest)
      } catch (e) {
        console.log(chalk.red("ERROR:"), chalk.red(e.message))
        appendFile("./lib/error", e.message)
      }
    }
    for (const [i, src] of this.fileList.entries()) {
      const dir = path.basename(src).replace("csv", "json")
      console.log({ dir, dest$ })
      // process.exit(1)
      const dest = path.join(dest$, dir)
      write(dest, JSON.stringify(list[i], null, 2))
    }
  }
  async convert(file, opts) {
    if (opts.type === "CSV") return {}
    const csvString = file.toString()
    const [_keys, _, ...values] = csvString.split(/\n/)
    const [keys, ...vals] = [_keys, ...values].map(arr => arr.split(","))
    const valSet = new Set()
    vals.forEach(val => {
      const o = {}
      for (const [i, el] of val.entries()) {
        const value = keys[i]
        if (value === "h\r") continue
        if (value === "identifier") {
          const i = el.indexOf("_")
          o.identifier = el.slice(0, i)
        } else if (~validKeys.indexOf(value)) {
          const [type, amount] = el.split(":")
          Reflect.set(o, value, [
            {
              type,
              amount
            }
          ])
        } else if (value === "abilities") {
          const element = el
            .split("|")
            .map(k => k.split(":").map(s => s.trim()))
          Reflect.set(
            o,
            value,
            element.reduce((o, [k, v]) => ({ ...o, [k]: v }), {})
          )
        } else {
          Reflect.set(o, keys[i], isNumber(el))
        }
      }
      valSet.add(o)
    })
    return [...valSet]
  }
}
export default CSVParser
