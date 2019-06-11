import path from "path"
class CSVParser {
  constructor(public fileList: string[]) {}

  static singleParser(file: string) {
    return new CSVParser([file])
  }

  public async parse(dest: string) {
    const {
      promises: { readFile }
    } = await import("fs")
    const files = this.fileList.map(async (file: string) => {
      const src = path.join(process.cwd(), file)
      const csv = await readFile(src)
      return this.convert(csv, { type: "JSON" })
    })

    const list = await Promise.all(files)
    const fileMap = new Map()
    for (const [i, src] of this.fileList.entries()) {
      fileMap.set(src.replace("./", ""), list[i])
    }

    return [...fileMap].reduce(
      (o, [k, v]) => ({
        ...o,
        [k]: v
      }),
      {}
    )
  }

  private async convert(
    file: Buffer,
    opts: { type: "JSON" | "CSV" }
  ): Promise<Record<string, any> | any[]> {
    if (opts.type === "CSV") return {}
    const csvString = file.toString()
    const [_keys, _, ...values] = csvString.split(/\n/)
    const [keys, ...vals] = [_keys, ...values].map(arr => arr.split(","))
    const valSet = new Set()
    vals.forEach(val => {
      const o: Record<any, any> = {}
      for (const [i, el] of val.entries()) {
        Reflect.set(o, keys[i], el)
      }
      valSet.add(o)
    })
    return [...valSet]
  }
}

export default CSVParser
