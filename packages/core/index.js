import fetch from "node-fetch"
import setupCSVParser from "csvtojson"
Map.fromObject = o => new Map(Object.entries(o))
const rgbToHex = (r, g, b) => {
  const hexStr = [r, g, b]
    .map(n => {
      const hex = n.toString(16)
      return hex.length < 2 ? `0${hex}` : hex
    })
    .join("")

  const { length } = hexStr
  return hexStr.padStart(length + 1, "#")
}
/**
 * @param {string} str
 */
const camelCase = str =>
  [str.substr(0, 1).toLowerCase(), str.substr(1)].join("")
String.prototype.toCamelCase = function() {
  return camelCase(this)
}
const csv = setupCSVParser()
const keys = [
  [
    "dragonEggCurrencyByTier",
    "dragonColorNameByTier",
    "teamAttackDragonXPBonusMultiplierByTier",
    "dragonColorByTier"
  ],
  ["dragonEggGoldCost", "dragonEggCost"]
]
global.chunks = []
async function main(uri) {
  const url = new URL(uri)
  const res = await fetch(url)
  const {
    csv: { data }
  } = await res.json()

  const buffer = Buffer.from(data)

  const csvData = buffer.toString()
  const result = []
  return new Promise(resolve => {
    csv
      .fromString(csvData)
      .subscribe(obj => {
        const chunk = {
          ...obj
        }
        if (~keys[0].indexOf(chunk.key)) {
          const { key: chunkKey, value } = chunk
          const key = chunkKey.substr(0, chunkKey.indexOf("ByTier"))
          const parsed = value.split("|")
          chunk.value = parsed.reduce((o, kv) => {
            const [tier, value] = kv.split(":")
            const num = Number.isInteger(Number(value))
              ? Number.parseInt(value, 10)
              : Number.parseFloat(value)
            return [
              ...o,
              {
                tier: Number.parseInt(tier, 10),
                [key === "dragonColorName" ? "tierName" : key]:
                  Object.is(num, NaN) || value.includes("~") ? value : num
              }
            ]
          }, [])
        }

        if (chunk.key === "dragonColorByTier") {
          const { value } = chunk
          console.log(value, chunk.key)
          chunk.value = value.map(({ tier, dragonColor }) => ({
            tier: Number.parseInt(tier),
            color: rgbToHex(
              ...dragonColor.split("~").map(n => Number.parseInt(n, 10))
            )
          }))
        } else if (chunk.value.includes("|")) {
          chunk.value = chunk.value.split("|")
        } else {
          const { value } = chunk
          const n = Number.parseInt(value)
          if (!Object.is(n, NaN)) {
            chunk.value = n
          }
        }
        if (chunk.key === "statsViewOffset") {
          chunk.value = chunk.value.map(n => Number.parseInt(n, 10))
        }

        if (~keys[1].indexOf(chunk.key)) {
          const [k, v] = chunk.value.split(":")
          chunk.value = {
            [k]: Number.parseInt(v, 10)
          }
        }
        if (chunk.key === "dragonEggDistributionForUndefinedDistribution") {
          const { value } = chunk
          chunk.value = value.map(kv => {
            const [k, v] = kv.split(":")
            return {
              [k]: Number.parseInt(v, 10)
            }
          })
        }
        return new Promise(resolve => {
          Reflect.deleteProperty(chunk, "h")
          result.push(chunk)
          resolve()
        })
      })
      .on("done", () => {
        resolve({
          key: url.pathname.substr(5),
          [url.pathname.substr(5).toCamelCase()]: result
        })
      })
  })
}

main("https://qwkhi.sse.codesandbox.io/api/DragonParameters").then(
  async ({ key, dragonParameters }) => {
    const { promises: fs } = await import("fs")

    fs.writeFile(
      `../parser/lib/data/results/r/${key}.json`,
      JSON.stringify(dragonParameters, null, 2)
    ).then(() => {
      console.log("SUCCESS")
    })
  }
)
