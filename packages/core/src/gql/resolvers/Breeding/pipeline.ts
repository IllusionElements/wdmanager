export default {
  $match: (deck: string) => ({ deck }),

  $unwind: ["$children", "$breedMatches"],
  $lookup: {
    from: "breeding",
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
    newRoot: {
      _id: "$breedMatches._id",
      breedChance: "$breedMatches.breedChance",
      dragon: "$breedMatches.dragon"
    }
  }
} as const
