// import Eggs from "./egg.json"
// import EggData from "./eggData.json"
// import { promises as fsPromise } from "fs"
// import { ObjectID } from 'mongodb';
console.time("loop")
// console.log(Eggs.length === EggData.length)
// const O = (n, m) => {
//   const num = BigInt(m.length) ** BigInt(n.length)
//   const _n = num.toString(10)
//   const [a, b, c] = _n.slice(0, 3)
//   const d = _n.slice(3).length
//   return `O(${a}.${b}${c}E+${d})`
// }

// console.log(O(Eggs, EggData))
// process.exit(0)
// for (const Egg of Eggs) {
//   console.time(1)
//   const isEqual = EggData.find(
//     ({ identifier }) => identifier === Egg.identifier
//   )
//   console.timeEnd(1)
//   if (!isEqual) {
//     throw new Error("PROPERTY MISMATCH on " + Egg.identifier)
//   }
// }
// console.timeEnd("loop")
// // const isValidNumber = n => typeof n === "number" && !Object.is(n, NaN)
// // const drags = []

// // const [schema] = [
// //   {
// //     identifier: "String",
// //     inBundle: "String",
// //     displayName: "LocalizedString",
// //     defaultSceneFile: "String",
// //     dragonClass: "String",
// //     dragonType: "LocalizedString",
// //     defaultRarity: "Integer",
// //     elementIdentifier: "String",
// //     displayDescription: "LocalizedString",
// //     stableHint: "String",
// //     defaultDiscoveredImage: "String",
// //     undiscoveredImage: "String",
// //     defaultIconFilename: "String",
// //     iconFilenameLocked: "String",
// //     upgradeCSVFileName: "String",
// //     fidgets: "String",
// //     minRange: "Integer",
// //     unlockAchievement: "String",
// //     attackStartVal: "Integer",
// //     sellBasePrice: "String",
// //     unavailableSpellTypes: "String",
// //     showcaseNodeLocation: "String",
// //     isAttainable: "Integer",
// //     sortPriority: "Integer",
// //     minDragonLevelForBreeding: "Integer",
// //     minBreedingCaveBuildingLevelToBreed: "Integer",
// //     incubatingTime: "Integer",
// //     incubationAchievementRequirement: "String",
// //     incubationBuildingLevelRequirement: "Integer",
// //     defaultMaxLevel: "Integer",
// //     researchMaxLevelIncrease: "String",
// //     eggCurrencyType: "String",
// //     eggDisplaySceneFile: "String",
// //     defaultAttackBoostRange: "String",
// //     defaultHPBoostRange: "String",
// //     canSell: "Integer",
// //     canUpgrade: "Integer",
// //     canBeSummoned: "Integer",
// //     deathPenaltyPercentage: "Integer",
// //     defaultTierNumber: "Integer",
// //     priorityWithinTier: "Integer",
// //     showInStable: "Integer",
// //     numberOfFragmentsNeeded: "Integer",
// //     isShrineDragon: "Integer",
// //     isGoldDragon: "Integer",
// //     limitedTimeOfferDragonActiveEvent: "String",
// //     limitedTimeOfferDragonParentsInfoFile: "String",
// //     isEvolveDragon: "Integer",
// //     canPlaceIntoPerch: "Integer",
// //     isUnbreedableDragon: "Integer",
// //     h: "String"
// //   }
// // ]
// // for (const _dragon of Dragons) {
// //   // console.log(_dragon)
// //   const dragon = { ..._dragon }
// //   for (const key of Object.keys(dragon)) {
// //     const value = dragon[key]
// //     console.assert(`${key[0]}${key[1]}` !== "is", `key has is, ${key}`)
// //     if (
// //       `${key[0]}${key[1]}` === "is" ||
// //       key === "isAttainable" ||
// //       key.slice(0, 3) === "can"
// //     ) {
// //       const v = Number.parseInt(value)
// //       console.log({ v })
// //       if (isValidNumber(v)) {
// //         Reflect.set(dragon, key, !!v)
// //       } else if (value === "") {
// //         Reflect.set(dragon, key, Boolean(""))
// //       }
// //     } else if (
// //       schema[key] === "Integer" &&
// //       isValidNumber(Number.parseInt(value, 10))
// //     ) {
// //       Reflect.set(dragon, key, Number.parseInt(value, 10))
// //     } else if (
// //       !value.includes("~") &&
// //       schema[key] === "Integer" &&
// //       !isValidNumber(Number.parseInt(value, 10))
// //     ) {
// //       Reflect.set(dragon, key, 0)
// //     }
// //   }
// //   drags.push(dragon)
// // }
// // console.log(drags[1])
// // fsPromise
// //   .writeFile("./dragon.json", JSON.stringify(drags, null, 2))
// //   .then(() => console.log(process.cwd()))
const ObjectId = a => a
const NumberInt = n => Number.parseInt(n, 10)
const res = {
  _id: ObjectId("5cf6f6f865c53035d460f05f"),
  identifier: NumberInt(1),
  firstDragonIdentifier: "T1C1WFdragon",
  secondDragonIdentifier: "T1C1SEdragon",
  possibleRawEggDistribution: {
    type: "deck0001",
    probability: NumberInt(1)
  },
  eggNumber: "1"
}

console.log(
  Object.keys(res).reduce(
    (o, key) => ({
      ...o,
      [key]: `$${key}`
    }),
    {}
  )
)

const a = {
  from: "decks",
  let: { deck: "$possibleRawEggDistribution.type" },
  pipeline: [
    {
      $match: {
        $expr: {
          $eq: ["$identifier", "$$deck"]
        }
      }
    },
    {
      $unwind: "$possibleOutcomeDistribution"
    },
    {
      $lookup: {
        from: "dragons",
        let: { pair: "$possibleOutcomeDistribution.id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$identifier", "$$pair"]
              }
            }
          }
        ],
        as: "name"
      }
    }
  ],
  as: "breedPairs"
}

// Uncorrelated Subqueries
// (supported as of MongoDB 3.6)
// {
//    from: "<collection to join>",
//    let: { <var_1>: <expression>, …, <var_n>: <expression> },
//    pipeline: [ <pipeline to execute on the collection to join> ],
//    as: "<output array field>"
// }
