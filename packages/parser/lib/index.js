import fs from "fs"
import loadDragons from "./dragon.js"
import path, { format } from "path"
import chalk from "chalk"
import CSVParser from "./csvParser"
// const argMap = new Map()
// const commands = process.argv.slice(2)
// const main = process.cwd()
// let prevKey = ""
// const isEven = n => !(n % 2)
// for (const [index, keyValue] of commands.entries()) {
//   if (isEven(index)) {
//     prevKey = keyValue
//   } else {
//     argMap.set(prevKey.substr(1).trim(), keyValue.trim())
//   }
// }
// const base = `dragonUpgrades`
// const generateName = (tier, c, klass) =>
//   `t${tier}c${c}${klass}${base}`.toUpperCase()
Array.prototype.has = function(key) {
  return !!~this.indexOf(key)
}
Promise.try = promise =>
  new Promise(resolve => {
    resolve(promise())
  })

// const dirs = ["assets", "dragons", "results", "_OLDassets"]
// const dir = fs.promises
//   .readdir(path.join(process.cwd(), "lib/data"))
//   .catch(console.error)
// const dir2 = fs.promises.readdir(path.join(process.cwd(), "lib/data/assets"))
// Promise.try(async () => {
//   const files = await dir
//   const csvParser = new CSVParser(files.filter(file => !~dirs.indexOf(file) || ))
//   try {
//     await csvParser.parse("assets")
//   } catch (e) {
//     console.error(e.message)
//   }
// })
/**
 * @returns {Promise<string[]>}
 */
const parseFileNames = async () => {
  const dragons = await loadDragons()
  return dragons.map(({ upgradeCSVFileName, identifier }) => {
    if (upgradeCSVFileName.includes(".png")) {
      console.log(identifier)
    }
    return upgradeCSVFileName
  })
}
// parses the main dragon.csv file into json
const parseDragonCSV = async () =>
  Promise.try(async () => {
    const dragonCSV = await fs.promises.readFile("./lib/data/Dragon.csv", {
      encoding: "utf-8"
    })
    const [dragonKeys, , ...dragons] = dragonCSV
      .split(/\n/)
      .map(values => values.split(","))
    const data = []
    for (const dragon of dragons) {
      const drag = {}
      for (const [index, value] of dragon.entries()) {
        const key = Reflect.get(dragonKeys, index)
        Reflect.set(drag, key, value)
      }
      data.push(drag)
    }

    try {
      await fs.promises.writeFile(
        "./lib/data/results/dragon.json",
        JSON.stringify(data, null, 2)
      )
    } catch (e) {
      console.error(e)
    }
  }).catch(console.error)
//joins dragon data with level data
const joinData = () =>
  Promise.try(async () => {
    const dragons = await loadDragons()
    const dragonMap = new Map()
    for (const [i, { identifier }] of dragons.entries()) {
      dragonMap.set(identifier, {
        ...dragons[i]
      })
    }
    const files = dragons.map(({ upgradeCSVFileName }) =>
      import(`./data/assets/${upgradeCSVFileName.replace(".csv", ".json")}`)
    )
    for await (const { default: levels } of files) {
      const [{ identifier }] = levels
      const drag = dragonMap.get(identifier)
      dragonMap.set(identifier, {
        ...drag,
        levels
      })
      console.log(
        chalk.greenBright("SUCCESS:"),
        chalk.green(`dragon ${identifier} levels successfully wrote to file`)
      )
    }

    const data = JSON.stringify([...dragonMap.values()], null, 2)
    try {
      await fs.promises.writeFile("./lib/data/results/dragonInfo.json", data)
    } catch (e) {
      console.error(e.message)
    }
    return data
  })

const parseDeck = outcome => {
  let total = 0
  const dist = outcome.split("|")
  const prob = dist.map(k => {
    const [id, distribution] = k.split(":")
    total += Number.parseInt(distribution, 10)
    return {
      id,
      distribution: Number.parseFloat(distribution)
    }
  })
  return prob.map(({ distribution, ...rest }) => {
    const d = distribution / total
    const probability = d.toFixed(2)
    return {
      ...rest,
      distribution,
      probability: Number.parseFloat(probability)
    }
  })
}

const parseDeckData = () =>
  fs.promises
    .readFile("./lib/data/csv/Deck.csv", {
      encoding: "utf-8"
    })
    .then(result => {
      console.time("Parse & write done in")
      const [headers, , ...decks] = result
        .split(/\n/)
        .map(deck => deck.split(","))
      const data = []
      for (const fields of decks) {
        const deck = {}
        for (const [i, field] of fields.entries()) {
          const key = headers[i]
          if (key === "possibleOutcomeDistribution") {
            Reflect.set(deck, key, parseDeck(field))
          } else {
            Reflect.set(deck, key, field)
          }
        }
        data.push(deck)
      }

      return fs.promises.writeFile(
        "./lib/data/results/deck.json",
        JSON.stringify(data, null, 2)
      )
    })
    .catch(e => console.error(chalk.red("ERROR: "), chalk.red(e.message)))
function jsonImport(fileURL) {
  return import(fileURL).then(a => a.default)
}
const parse = ({ identifier, ...deck }) => {
  const copy = {
    identifier,
    possibleOutcomeDistribution: [...deck.possibleOutcomeDistribution]
  }
  // console.log(success)
  return copy
}
const fix = () =>
  jsonImport("./data/results/deck.json")
    .then(deck => {
      const data = deck.map(parse)
      const result = JSON.stringify(data, null, 2)
      console.log({ data: data[3] })
      return result
    })
    .then(data => fs.promises.writeFile("./lib/data/results/deck_4.json", data))
    .finally(() => console.timeEnd("Parse & write done in"))
const formatData1 = data => {
  const splitData = [data.split(":")]
  return splitData.reduce(
    (o, [k, v]) => ({
      ...o,
      [k]: Number(v)
    }),
    {}
  )
}

const formatData = data =>
  Object.entries(data).reduce(
    (o, [type, probability]) => ({
      ...o,
      type,
      probability
    }),
    {}
  )
jsonImport("./data/results/dragonEgg_2.json")
  .then(dragonEggs =>
    dragonEggs.map(dragonEgg => ({
      ...dragonEgg,
      possibleRawEggDistribution: dragonEgg.possibleRawEggDistribution.map(formatData),
      goldPossibleRawEggDistribution: dragonEgg.goldPossibleRawEggDistribution.map(formatData)
    }))
  )
  .then(egg =>
    fs.promises.writeFile(
      "./lib/data/results/dragonEgg.json",
      JSON.stringify(egg, null, 2)
    )
  )
