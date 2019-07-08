import * as Events from "./Emitter"
Events.Emitter.emit(Events.INSTALLED, {
  arg: "PIPELINE.IMPORTED"
})
export default {
  $match: deck => ({ deck }),
  $unwind: ["$children", "$breedMatches"],
  $lookup: {
    from: "breeds",
    let: {
      ids: "$children"
    },
    pipeline: [
      {
        $match: {
          $expr: {
            $eq: ["$_id", "$$ids"]
          }
        }
      },
      {
        $lookup: {
          from: "dragons",
          localField: "dragonIdentifier",
          foreignField: "identifier",
          as: "dragon"
        }
      },
      {
        $project: {
          _id: 1,
          dragonIdentifier: 1,
          breedChance: 1,
          dragon: 1
        }
      },
      {
        $unwind: "$dragon"
      }
    ],
    as: "breedMatches"
  },
  $replaceRoot: {
    _id: "$breedMatches._id",
    breedChance: "$breedMatches.breedChance",
    dragon: "$breedMatches.dragon"
  }
}
